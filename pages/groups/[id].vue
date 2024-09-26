<!-- 
  @todo:
  - 繼續完善群組頁面的呈現
  - 加上群組的債務總和（個別成員的對應債務）
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
import { getDebts } from '@/utils/utils'

const { id } = useRoute().params
const { getRecordsByGroup } = useRecordsStore()
const { getGroupById } = useGroupsStore()

const records = getRecordsByGroup(id as string) // 該群組的 records。要準備拿來計算 summary 的資料
const group = getGroupById(id as string)
const debts = records.map(record => getDebts(record)).flat()
console.log(records);
let temp: {
  displayName: string
  value: number
}[] = []
debts.forEach(obj => {
  const { displayName, debt } = obj
  
  const isExist = temp.find(item => item.displayName === displayName)

  if (isExist) {
    isExist.value += debt
  } else {
    temp.push({
      displayName,
      value: debt
    })
  }
})

const summary = temp.map(obj => {
  let status = ''
  if (obj.value > 0) {
    status = '可回收'
  } else if (obj.value < 0) {
    status = '應支付'
  } else {
    status = '無欠款'
  }

  return {
    displayName: obj.displayName,
    status,
    value: obj.value
  }
})

console.log(summary)

</script>

<style scoped lang="sass">

</style>