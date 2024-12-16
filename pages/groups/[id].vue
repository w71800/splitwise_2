<!-- 
  @todo:
  - 繼續完善群組頁面的呈現
-->

<template lang="pug">
.page
  .container
    Header(:title="group.name" :summary="partialSummary")
    Button.settleup-button(@click="handleSettleUp" themeColor="secondary") 結算
  .records
    Record(v-for="record in records" :key="record.id" :record="record")
</template>

<script setup lang="ts">
import { useRecordsStore } from '@/store/records'
import { useUserDataStore } from '@/store/userData'
import { getSummary } from '@/utils/utils'
import Button from '@/components/Button.vue'

const { id: groupId } = useRoute().params
const userDataStore = useUserDataStore()
const { getRecordsByGroup, createDebtTracker } = useRecordsStore()
const { id: userId, groups } = storeToRefs(userDataStore)

const records = getRecordsByGroup(groupId as string)
const { partial: partialSummary } = getSummary(records, userId.value)
const group = groups.value?.find(group => group.id === groupId)
const debtTrackers = computed(() => records.map(record => createDebtTracker(record.id)))
// const balance = computed(() => debtTrackers.value.reduce((acc, debtTracker) => acc + debtTracker.getBalance(groupId as string), 0))

// const handleSettleUp = () => {
//   let settlement = null
//   settlementsStore.toggleSettlementEditor()
//   if(balance.value <= 0) { // 如果我欠對方錢，則我結算
//     settlement = createSettlement(userId.value, friendId as string, balance.value)
//   } else { // 如果對方欠我錢，則對方結算
//     settlement = createSettlement(friendId as string, userId.value, balance.value)
//   }
//   settlementsStore.addSettlement(settlement)
// }
</script>

<style scoped lang="sass">
.settleup-button
  position: relative
  left: 16px

</style>