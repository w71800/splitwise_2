<!-- 
  @todo: 
    - 要不要把 store 集中起來管理？
    - 這邊可能要用到另一個 layout
-->

<template lang="pug">
//- todo: 消化這邊的寫法（為什麼 v-model 可以跟 emits綁起來用），並複習 emits 的用法
.page
  .records
    Record(v-for="record in displayRecords" :key="record.id" :record="record")
</template>

<script setup lang="ts">
import { useRecordsStore } from '@/store/records'
import { filterRecords } from '@/utils/utils'

definePageMeta({
  layout: 'search'
})
const { records } = useRecordsStore()

const parentActiveTags = ref<string[]>([]) // stop: 做到選擇標籤這邊

const displayRecords = computed(() => filterRecords(records, { tags: parentActiveTags.value }))


watch(parentActiveTags, (newTags) => {
  console.log('Active tags changed:', newTags)
  // 在這裡你可以進行任何需要的操作，比如過濾記錄等
})

</script>
<style scoped lang="sass">

</style>