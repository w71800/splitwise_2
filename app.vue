<!-- 
  @todo: 
  - 首頁顯示最新動態之類的東西，沒登入的話（例如沒有 token），顯示登入頁面。且不顯示 topbar 和 navbar
  - 實作紀錄增加功能
  - 一些還款、欠款、應支付、可回收等狀態的顯示優化。目前的版本看到會有點不直觀。例如說群組或朋友頁面中。小華：應支付 152 元。這樣應該是指我欠小華 152 元。但字面上看起來是小華要給我 152 元。
  
-->

<template lang="pug">
#app(v-if="isLoading")
  Loading
#app(v-else)
  NuxtLayout
    NuxtPage
  SideNotification
  
</template>

<script setup lang="ts">
import { provide, ref, onErrorCaptured, reactive } from 'vue'
import type { Record } from '@/types/types'
import { useRecordsStore } from '@/store/records'
import { useUserDataStore } from '@/store/userData'
import { useEditorStore } from '@/store/editor'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/auth'


const { isAuthenticated } = useAuth()
const router = useRouter()
const recordsStore = useRecordsStore()
const editorStore = useEditorStore()
const userDataStore = useUserDataStore()

const isNotificationShowing = ref(false)
const isProcessSuccess = ref(true)
const isLoading = ref(true)

provide('isNotificationShowing', isNotificationShowing)
provide('isProcessSuccess', isProcessSuccess)
provide('isLoading', isLoading)

const handleAddNewRecord = (): void => {
  console.log('handleAddNewRecord')
  editorStore.openEditor()
}

const handleEditRecord = (record: Record): void => {
  editorStore.openEditor(record)
}

const initApp = async () => {
  isLoading.value = true
  try {
    await userDataStore.loadUserData()
    await recordsStore.loadRecords()
    await editorStore.initializeEditor()
  } catch (error) {
    console.error(error)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
}

provide('handleAddNewRecord', handleAddNewRecord)
provide('handleEditRecord', handleEditRecord)
provide('initApp', initApp)

onMounted(async () => {
  await initApp()
  if(!isAuthenticated.value){
    alert('請先登入！')
    router.push('/auth')
  }
})

onErrorCaptured((error) => {
  console.log(error)
})

router.beforeEach(async (to, from, next) => {
  console.log('當前驗證狀態：', isAuthenticated.value)
  console.log('目標路由：', to.path)

  // 如果已經在 auth 頁面，直接放行
  if (to.path === '/auth') {
    next()
    return
  }

  // 如果未驗證且不是要去 auth 頁面，則重定向
  if (!isAuthenticated.value) {
    alert('請先登入！')
    next('/auth')
    return
  }

  // 其他情況直接放行
  next()
})
</script>
