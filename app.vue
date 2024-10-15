<!-- 
  @todo: 
  - 首頁顯示最新動態之類的東西，沒登入的話（例如沒有 token），顯示登入頁面。且不顯示 topbar 和 navbar
  - 實作紀錄增加功能
  - 一些還款、欠款、應支付、可回收等狀態的顯示優化。目前的版本看到會有點不直觀。例如說群組或朋友頁面中。小華：應支付 152 元。這樣應該是指我欠小華 152 元。但字面上看起來是小華要給我 152 元。
-->

<template lang="pug">
NuxtLayout
  NuxtPage
</template>

<script setup lang="ts">
import { provide } from 'vue'

const isEditorShowing: Ref<boolean> = ref(false)

provide('isEditorShowing', isEditorShowing)
</script>
