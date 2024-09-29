<!-- 
  @todo:
  - 製作朋友頁面的呈現
-->

<template lang="pug">
.page
  .container
    Header(:title="你好" :summary="summary")
  .records
    Record(v-for="record in displayRecords" :key="record.id" :record="record")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRecordsStore } from '@/store/records'
import { getDebts, getSummary } from '@/utils/utils'
import type { Record, User } from '@/types/types'

const route = useRoute()
const { id } = route.params
const recordStore = useRecordsStore()
const { getRecordsByFriend } = recordStore
const displayRecords = getRecordsByFriend(id as string)

const friend = ref<User | null>(null)


// 計算摘要
const summary = getSummary(displayRecords)
console.log(summary)

// 可以考慮添加一個緩存機制
// const cachedRecords = useMemo(() => displayRecords.value, [id])
</script>

<style scoped lang="sass">
.page
  padding-top: 50px // 這裡可以根據 Header 組件的實際高度進行調整
</style>