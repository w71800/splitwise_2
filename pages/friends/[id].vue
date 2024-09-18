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
const { id } = useRoute().params
const displayRecords = ref<Record[]>([])
const fakeRecords: Record[] = [
  {
    id: '1',
    title: '午餐',
    value: 300,
    fullDate: '2024-03-15',
    participants: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' },
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' }
    ],
    payers: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' }
    ],
    method: 'equal'
  },
  {
    id: '2',
    title: '電影票',
    value: 500,
    fullDate: '2024-03-20',
    participants: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' },
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' },
      { id: '3', name: '小芳', email: 'xiaofang@example.com', phone: '0934567890' }
    ],
    payers: [
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' }
    ],
    method: 'fixed'
  },
  {
    id: '3',
    title: '生日禮物',
    value: 120,
    fullDate: '2024-04-01',
    participants: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' },
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' },
      { id: '3', name: '小芳', email: 'xiaofang@example.com', phone: '0934567890' }
    ],
    payers: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' },
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' },
      { id: '3', name: '小芳', email: 'xiaofang@example.com', phone: '0934567890' }
    ],
    method: 'percentage'
  }
]
try {
  const records = await getRecords('friends', id as string)
  displayRecords.value = records
} catch (error) {
  displayRecords.value = fakeRecords
}
</script>

<style scoped lang="sass">

</style>