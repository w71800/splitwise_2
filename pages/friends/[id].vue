<!-- 
  @todo:
  - 製作朋友頁面的呈現
  - 摘要的部分應該要更改為每個使用者專屬的摘要，例如說可以看到自己欠了誰多少錢，或是被多少人欠錢，而不用看到所有人的摘要
-->

<template lang="pug">
.page
  .container
    Header(:title="friend?.displayName" :summary="partialSummary")
  .records
    Record(v-for="record in displayRecords" :key="record.id" :record="record")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRecordsStore } from '@/store/records'
import { useUserDataStore } from '@/store/userData'
import { getDebts, getSummary } from '@/utils/utils'
import type { User } from '@/types/types'

const route = useRoute()
const { id: friendId } = route.params

const userDataStore = useUserDataStore()
const { getRecordsByFriend } = useRecordsStore()
const displayRecords = getRecordsByFriend(friendId as string)

const { id: userId, friends } = storeToRefs(userDataStore)
const friend: User = friends.value?.find(friend => friend.id === friendId)!


const { partial } = getSummary(displayRecords, userId.value)
const partialSummary = partial.filter(item => item.id === friendId)

// 可以考慮添加一個緩存機制
// const cachedRecords = useMemo(() => displayRecords.value, [id])
</script>

<style scoped lang="sass">
.page
  padding-top: 50px // 這裡可以根據 Header 組件的實際高度進行調整
</style>