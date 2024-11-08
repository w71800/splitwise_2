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
import { useUserDataStore } from '@/store/userData'
import { getSummary } from '@/utils/utils'

const { id } = useRoute().params
const userDataStore = useUserDataStore()
const { getRecordsByGroup } = useRecordsStore()
const { id: userId, groups } = storeToRefs(userDataStore)

const records = getRecordsByGroup(id as string)
const { partial: partialSummary } = getSummary(records, userId.value)
const group = groups.value?.find(group => group.id === id)
</script>

<style scoped lang="sass">

</style>