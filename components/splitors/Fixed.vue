<template lang="pug">
#calculator
  .calculator__content
  .calculator__hinter
    .title 
      span 已分配 
      span $180 
      span 中的 
      span $150
    .subtitle(v-if="!settled") 
      span 剩餘 
      span $30 
      span 未分配
    .settled(v-else) 全部分配完了！
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  const settled = ref(false)
  
  </script>
  
  <style scoped lang="sass">
  
  </style>