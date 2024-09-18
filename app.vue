<!-- 
  @todo: 
  - 1. 將假資料集中在一個檔案中管理
  - 2. 首頁顯示最新動態之類的東西，沒登入的話（例如沒有 token），顯示登入頁面。且不顯示 topbar 和 navbar
-->

<template lang="pug">
NuxtLayout
  NuxtPage
</template>

<script setup lang="ts">
const records = ref([
  {
    id: '1',
    value: 400,
    fullDate: "2024-08-01",
    participants: ['Alice', 'Bob'],
    payers: ['Alice'],
    title: '火鍋聚餐'
  },
  {
    id: '2',
    value: 250,
    fullDate: "2024-07-15",
    participants: ['Charlie', 'David', 'Eve'],
    payers: ['Charlie', 'David'],
    title: '電影票'
  },
  {
    id: '3',
    value: 680,
    fullDate: "2024-09-03",
    participants: ['Frank', 'Grace', 'Henry', 'Ivy'],
    payers: ['Frank'],
    title: '燒烤派對用品'
  }
])
</script>
