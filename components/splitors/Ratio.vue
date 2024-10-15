<template lang="pug">
#splitor
  .splitor__content
    .participants
      .participant(v-for="i in 10" :key="i")
        .avatar
          img(:src="'/avatars/profile.jpg'")
        .name 威利
        input(type='checkbox' name='participant')
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

</script>

<style scoped>

</style>