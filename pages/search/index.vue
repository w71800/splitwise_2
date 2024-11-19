<template lang="pug">
.page
  .records(v-if="displayRecords.length > 0")
    Record(v-for="record in displayRecords" :key="record.id" :record="record")
  .no-records(v-else)
    .text 目前無帳目紀錄
</template>

<script setup lang="ts">
import { useRecordsStore } from '@/store/records'
import { filterRecords } from '@/utils/utils'

definePageMeta({
  layout: 'search'
})

const activeTags = inject<Ref<string[]>>('activeTags')
const { records } = storeToRefs(useRecordsStore())

const displayRecords = computed(() => filterRecords(records.value, { tags: activeTags.value }))
// const displayRecords = ref<Record[]>([])

</script>
<style scoped lang="sass">
.page
  padding-bottom: 65px
.no-records
  text-align: center
  margin-top: 20px
  font-size: 1.2rem
  color: #D5D5D5
</style>
