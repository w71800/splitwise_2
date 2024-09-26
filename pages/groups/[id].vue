<!-- 
  @todo:
  - 繼續完善群組頁面的呈現
  - 把取得 summary 的邏輯放到整理起來，放到 utils 中
-->

<template lang="pug">
.page
  .container
    Header(:title="group.name" :summary="summary")
  .records
    Record(v-for="record in records" :key="record.id" :record="record")
</template>

<script setup lang="ts">
import { useRecordsStore } from '@/store/records'
import { useGroupsStore } from '@/store/groups'
import { getDebts, getSummary } from '@/utils/utils'

const { id } = useRoute().params
const { getRecordsByGroup } = useRecordsStore()
const { getGroupById } = useGroupsStore()

const records = getRecordsByGroup(id as string) // 該群組的 records。要準備拿來計算 summary 的資料
const group = getGroupById(id as string)
const summary = getSummary(records)



</script>

<style scoped lang="sass">

</style>