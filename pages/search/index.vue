<template lang="pug">
.page
  SearchInput(v-model:activeTags="parentActiveTags")
  .records
    Record(v-for="record in displayRecords" :key="record.id" :record="record")
</template>

<script setup lang="ts">
import { useRecordsStore } from '@/store/records'
import { filterRecords } from '@/utils/utils'

const { records } = useRecordsStore()
const parentActiveTags = ref<string[]>([]) // stop: 做到選擇標籤這邊
watch(parentActiveTags, (newTags) => {
  console.log('Active tags changed:', newTags)
  // 在這裡你可以進行任何需要的操作，比如過濾記錄等
})
const displayRecords = computed(() => filterRecords(records, { tags: parentActiveTags.value }))

</script>
<style scoped lang="sass">
.page
  top: 50px // todo: 要能夠動態地抓到 SearchInput 的 top

</style>