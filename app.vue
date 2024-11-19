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

const recordsStore = useRecordsStore()
const editorStore = useEditorStore()
const userDataStore = useUserDataStore()

const isNotificationShowing = ref(false)
const isProcessSuccess = ref(true)
const isLoading = ref(false)

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

provide('handleAddNewRecord', handleAddNewRecord)
provide('handleEditRecord', handleEditRecord)

onMounted(async () => {
  isLoading.value = true
  try {
    await userDataStore.setUserData()
    await recordsStore.loadRecords()
    await editorStore.initializeEditor()
  } catch (error) {
    console.error(error)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
})

onErrorCaptured((error) => {
  console.log(error)
})
</script>
