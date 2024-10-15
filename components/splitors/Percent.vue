<template lang="pug">
#splitor
  .splitor__content
    .participants
      .participant(v-for="i in 10" :key="i")
        .avatar
          img(:src="'/avatars/profile.jpg'")
        .name 威利
        .input_wrapper
          input(type='number' name='participant' placeholder='30')
          label(for="participant") %
  .splitor__hinter
    .title 
      span 已分配 
      span 100% 
    .subtitle(v-if="!settled") 
      span 還剩 
      span 60% 
      span 未分配
    .settled(v-else) 全部分配完了！
</template>

<script setup lang="ts">
import { ref } from 'vue'
const settled = ref(true)
</script>

<style scoped lang="sass">

.subtitle
  span:nth-child(2)
    color: $color_secondary
</style>