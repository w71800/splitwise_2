<template lang="pug">
h1 這是朋友 {{ id }}
.records
  Record(v-for="record in displayRecords" :key="record.id" :record="record")
</template>

<script setup lang="ts">
/**
 * @todo
 * - 這邊內容能否抓一次之後快取？
 * - 
 */
import type { Record } from '@/types/types.ts'
import { useRecordsStore } from '@/store/records'

const recordStore = useRecordsStore()
const { id } = useRoute().params
const displayRecords = ref<Record[]>([])

try {
  const records = await getRecords('friends', id as string)
} catch (error) {
  displayRecords.value = recordStore.records
}
</script>

<style scoped lang="sass">

</style>