<!-- 
  @todo:
  - 繼續完善群組頁面的呈現
  - 加上群組的債務總和（個別成員的對應債務）
-->

<template lang="pug">
.page
  .container
    Header(:title="group.name")
  .records
    Record(v-for="record in records" :key="record.id" :record="record")
</template>

<script setup lang="ts">
const { id } = useRoute().params
import { useRecordsStore } from '@/store/records'
import { useGroupsStore } from '@/store/groups'
const { getRecordsByGroup } = useRecordsStore()
const { getGroupById } = useGroupsStore()

const records = getRecordsByGroup(id as string)
const group = getGroupById(id as string)
</script>

<style scoped lang="sass">

</style>