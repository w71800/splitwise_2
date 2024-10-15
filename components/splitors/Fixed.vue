<template lang="pug">
#splitor
  .splitor__content
    .participants
      .participant(v-for="i in 10" :key="i")
        .avatar
          img(:src="'/avatars/profile.jpg'")
        .name 威利
        .input_wrapper.value_is_exist
          label(for="participant") $
          input(type='number' name='participant' placeholder='30')
  .splitor__hinter
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