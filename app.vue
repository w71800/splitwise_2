<!-- 
  @todo: 
  - 首頁顯示最新動態之類的東西，沒登入的話（例如沒有 token），顯示登入頁面。且不顯示 topbar 和 navbar
  - 實作紀錄增加功能
  - 一些還款、欠款、應支付、可回收等狀態的顯示優化。目前的版本看到會有點不直觀。例如說群組或朋友頁面中。小華：應支付 152 元。這樣應該是指我欠小華 152 元。但字面上看起來是小華要給我 152 元。
  
-->

<template lang="pug">
.app(v-if="isLoading")
  .loading 載入中...
.app(v-else)
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

const { fetchRecords, isLoading } = recordsStore
const userDataStore = useUserDataStore()
const { setUserData } = userDataStore

const isNotificationShowing = ref(false)
const isProcessSuccess = ref(true)
provide('isNotificationShowing', isNotificationShowing)
provide('isProcessSuccess', isProcessSuccess)

const createEmptyRecord = (): Record => ({
  id: '',
  title: '',
  value: 0,
  currency: 'TWD',
  fullDate: new Date(),
  participants: [],
  payers: {
    id: '',
    displayName: '',
    email: '',
    avatar: '',
    paid: 0
  },
  divisions: [],
  splitor: 'equal',
  group: {
    id: '',
    name: '',
    members: []
  }
})
const isEditorShowing = ref(false) as Ref<boolean>
const currentRecord = ref(createEmptyRecord()) as Ref<Record> // 紀錄當下的 record

const openEditor = (record: Record | null = null) => {
  currentRecord.value = record || createEmptyRecord()
  isEditorShowing.value = true
}

const handleAddNewRecord = (): void => {
  openEditor()
}

const handleEditRecord = (record: Record): void => {
  openEditor(record)
}

provide('isEditorShowing', isEditorShowing)
provide('handleAddNewRecord', handleAddNewRecord)
provide('handleEditRecord', handleEditRecord)

onMounted(async () => {
  await setUserData()
  await fetchRecords()
  editorStore.initializeEditor()
})

onErrorCaptured((error) => {
  console.log(error)
})
</script>
