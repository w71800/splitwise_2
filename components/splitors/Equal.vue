<template lang="pug">
#splitor
  .splitor__content
    .participants
      .participant(v-for="i in 10" :key="i")
        label(:for="`participant${i}`")
        .avatar
          img(:src="'/avatars/profile.jpg'")
        .name 威利
        .input_wrapper
          input(type='checkbox' name='participant' :id="`participant${i}`")
          
  .splitor__hinter
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
label
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  z-index: 1
.splitor__hinter
  display: flex
  align-items: center

.title
  flex-grow: 3
  margin-bottom: 0
  margin-right: 20px

.divider
  height: 40px
  border: 1px solid #D5D5D5
  margin-right: 20px

.select_all
  flex-basis: auto
  flex-shrink: 0
  display: flex
  align-items: center
  justify-content: flex-end
  gap: 20px
</style>
