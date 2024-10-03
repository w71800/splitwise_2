<template lang="pug">
.content.content--payer(v-if="isPayer")
  .avatar 
    img(src="/avatars/profile.jpg")
  .info 先付了 $670 
.content.content--debtor(v-else)
  .separator
  .wrapper
    .avatar
      img(src="/avatars/profile.jpg")
    .info 支付者（負擔 $670）
</template>

<script setup lang="ts">
const props = defineProps<{
  isPayer: boolean
}>()
</script>

<style lang="sass" scoped>  
$separator-width: 35px
$border-color: rgba($color_text, .5)

.avatar
  +block_size($separator-width)
  border-radius: 50%
  overflow: hidden
  margin-right: 10px
  border: 2px solid $border-color
img
  width: 100%
  object-fit: cover
.info
  align-content: center
  font-size: .8rem
.content
  display: flex
  // +debug()

.content--debtor
  position: relative
  left: calc($separator-width / 2)
  .wrapper 
    display: flex
    align-items: center
    transform: translateY(50%)
  .separator
    height: 45px
    width: $separator-width
    border-left: 1px solid $border-color
    border-bottom: 1px solid $border-color
    margin-right: 10px

</style>