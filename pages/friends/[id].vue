<!-- 
  @todo:
  - 製作朋友頁面的呈現
  - 摘要的部分應該要更改為每個使用者專屬的摘要，例如說可以看到自己欠了誰多少錢，或是被多少人欠錢，而不用看到所有人的摘要
-->

<template lang="pug">
.page
  .container
    Header(:title="friend?.displayName" :summary="partialSummary")
    .settleup-button(@click="settleUp") 結算
  .records
    Record(v-for="record in displayRecords" :key="record.id" :record="record")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRecordsStore } from '@/store/records'
import { useUserDataStore } from '@/store/userData'
import { getSummary } from '@/utils/utils'
import type { User } from '@/types/types'

const route = useRoute()
const { id: friendId } = route.params

const userDataStore = useUserDataStore()
const { getRecordsByFriend, createDebtTracker } = useRecordsStore()
const displayRecords = getRecordsByFriend(friendId as string)

const { id: userId, friends } = storeToRefs(userDataStore)
const friend: User = friends.value?.find(friend => friend.id === friendId)!
const debtTrackers = computed(() => displayRecords.map(record => createDebtTracker(record.id)))
const balance = computed(() => debtTrackers.value.reduce((acc, debtTracker) => acc + debtTracker.getBalance(friendId as string), 0))

const { partial } = getSummary(displayRecords, userId.value)
const partialSummary = partial.filter(item => item.id === friendId)

const settleUp = () => {
  // 1. 取得結算的總額
  // 2. 生成結算用的 record（顯示一個 modal）
  // 3. 更新本地的 records
  // 4. 更新遠端的 records
  console.log('settle up')
}

// 可以考慮添加一個緩存機制
// const cachedRecords = useMemo(() => displayRecords.value, [id])
</script>

<style scoped lang="sass">
.page
  padding-top: 50px // 這裡可以根據 Header 組件的實際高度進行調整

.container
  // +debug()
  margin-bottom: 20px

.settleup-button
  padding: 4px 10px
  padding-right: 8px
  background-color: $color_secondary
  width: fit-content
  border-radius: 6px
  color: white
  letter-spacing: 2px
  cursor: pointer
</style>