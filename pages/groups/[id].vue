<!-- 
  @todo:
  - 繼續完善群組頁面的呈現
-->

<template lang="pug">
.page
  .container
    Header(:title="group.name" :summary="partialSummary")
  .records
    Record(v-for="record in records" :key="record.id" :record="record")
</template>

<script setup lang="ts">
import { useRecordsStore } from '@/store/records'
import { useGroupsStore } from '@/store/groups'
import { useUserDataStore } from '@/store/userData'
import { getDebts, getSummary } from '@/utils/utils'

const { id } = useRoute().params
const { id: userId } = useUserDataStore()

const { getRecordsByGroup } = useRecordsStore()
const { getGroupById } = useGroupsStore()

const records = getRecordsByGroup(id as string)
const group = getGroupById(id as string)
const { partial: partialSummary } = getSummary(records, userId as string)



</script>

<style scoped lang="sass">

</style>