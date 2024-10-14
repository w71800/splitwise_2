<template lang="pug">
#calculator
  .calculator__content
    .participants
      .participant
        .avatar
          img(:src="'/avatars/profile.jpg'")
        .name 威利
        input(type='checkbox' name='participant')
      .participant
        .avatar
          img(:src="'/avatars/profile.jpg'")
        .name 威利
        input(type='checkbox' name='participant')
  .calculator__hinter
    .title 
      span 2 人分擔，每人分擔 $150
    .divider
    .select_all
      span 全選
      input(type='checkbox')
</template>

<script setup lang="ts">
import { ref } from 'vue'
const settled = ref(false)

</script>

<style scoped lang="sass">
.calculator__hinter
  display: flex
  align-items: center
  padding: 10px 20px
  gap: 20px
.divider
  height: 40px
  border: 1px solid #D5D5D5
.select_all
  margin-left: auto
  display: flex
  align-items: center
  justify-content: space-between
  gap: 20px
</style>