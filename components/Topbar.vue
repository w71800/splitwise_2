<!-- 
  @todo 
  - 路由歷史紀錄，應該要用類似 stack 的結構來實作，或者直接從 pathList 來取得？
  - 之後如果使用 Editor 導入進來，要能夠顯示成文字按鈕。
-->

<template lang="pug">
.topbar
  .topbar__left(@click="methodsMapper[config.left?.method]")
    NavigationButton(v-if="config.left" :option="config.left" class="left")
  .topbar__title
    .text {{ displayTitle }}
  .topbar__right(@click="methodsMapper[config.right?.method]")
    NavigationButton(v-if="config.right" :option="config.right" class="right")
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import configMapper, { type Config } from '@/utils/topbarConfig'
import type { Record } from '@/types/types'
import { useRecordsStore } from '@/store/records'
import { useEditorStore } from '@/store/editor'
import * as strapiApi from '@/utils/api'
import { useSideNotification } from '@/utils/composable'

const route = useRoute()
const router = useRouter()
const editorStore = useEditorStore()
const userRecordsStore = useRecordsStore()

const { id: editingRecordId } = route.params // NOTE: 這邊的 id 是從 records/:id 來的。但僅限從編輯模式才能抓到，從新增模式中是抓不到的。
const handleEditRecord = inject('handleEditRecord') as (record: Record) => void
const isLoading = inject('isLoading') as Ref<boolean>
const props = defineProps<Config>()

const { getRecordById, addRecord, updateRecord } = userRecordsStore
const { setRecord, loadDivisionsMapper, saveDivisions } = editorStore
const showNotification = useSideNotification()

const { record: currentRecord, editorMode, isEditorShowing, isEditorScrolled } = storeToRefs(editorStore)
const currentPath = ref(route.path)
const previousPath = ref('/search')

const pathList = computed(() => currentPath.value.split("/"))

// 優先使用 props 以串接從父元件來的組態設定。若沒有的話，使用從路由對照取得的組態
const config = computed(() => {
  if (props.left) {
    return props
  } else {
    const rootPath = pathList.value[1]
    const temp = configMapper[rootPath as keyof typeof configMapper]
    return pathList.value.length == 2
      ? { middle: temp.middle }
      : temp
  }
})

const displayTitle = computed(() => {
  return config.value.middle 
  ? config.value.middle 
  : editorMode.value === 'add' 
    ? "新增"
    : "編輯"
})


watch(() => route.path, (newPath, oldPath) => {
  currentPath.value = newPath
  previousPath.value = newPath.includes('records') ? oldPath : `/${pathList.value[1]}`
})

// todo: 調整命名，改成更易讀的方式。例如 back 是什麼東西 back？
const methodsMapper = {
  'back': async () => {
    try {
      isLoading.value = true
      await router.push(previousPath.value)
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    } catch (error) {
      console.error(error)
    } 
  },
  'edit': () => {
    const record = getRecordById(editingRecordId as string)!
    editorMode.value = 'put'
    if (record) { 
      handleEditRecord(record)
      setRecord(record)
      loadDivisionsMapper(record)
    } else {
      console.error('Record not found')
    }
  },
  'close': () => {
    isEditorShowing.value = false
    setRecord()
    loadDivisionsMapper()
  },
  'submit': async () => {
    const mode = editorMode.value
    if (mode === 'add') {
      try {
        const documentId = await strapiApi.postRecord(currentRecord.value)
        await addRecord({...currentRecord.value, id: documentId})
        
        setTimeout(() => {
          router.push(`/records/${documentId}`)
          showNotification('success')
        }, 500)
      } catch (error) {
        console.error(error)
        showNotification('error')
      }
    } else {
      try {
        let documentId = await updateRecord(currentRecord.value)
        await strapiApi.updateRecord(documentId)
        showNotification('success')
      } catch (error) {
        console.error(error)
        showNotification('error')
      }
    }
    isEditorShowing.value = false
    setRecord()
  },
  'scrollBack': () => {
    isEditorScrolled.value = false
  },
  'save': () => {
    saveDivisions()
    isEditorScrolled.value = false
  }
}
</script>

<style lang="sass" scoped>
.topbar
  // +debug
  position: sticky
  top: 0
  width: 100vw
  background-color: #fff
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 10px
  &__left, &__right
    +block_size(20px)
    cursor: pointer
  &__title
    padding: 5px 0px
    font-size: 1.3rem
    font-weight: $font_weight_regular
    color: $color_primary
      
</style>