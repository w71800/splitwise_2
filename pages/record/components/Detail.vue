<template lang="pug">
.detail.detail--payer(v-if="isPayer")
  .avatar 
    img(src="/avatars/profile.jpg")
  .info 威利先付了 $670 
.detail.detail--debtor(v-else)
  .separator
  .wrapper
    .avatar
      img(src="/avatars/profile.jpg")
    .info 小華欠款 15 元
</template>

<script setup lang="ts">
const props = defineProps<{
  isPayer: boolean
}>()
</script>

<style lang="sass" scoped>  
$separator-width: 50px
$border-color: rgba($color_text, .3)

.avatar
  +block_size($separator-width)
  border-radius: 50%
  overflow: hidden
  margin-right: 10px
img
  width: 100%
  object-fit: cover
.info
  align-content: center
  color: $color_text

.detail
  display: flex
  &--payer
    .avatar
      +block_size(50px)
      margin-right: 20px
    .info
      font-size: 1rem
  &--debtor
    position: relative
    left: calc($separator-width / 2)
    // +debug()
    .wrapper 
      display: flex
      align-items: center
      transform: translateY(50%)
    .separator
      height: 40px
      width: 35px
      border-left: 1px solid $border-color
      border-bottom: 1px solid $border-color
      margin-right: 10px
    .wrapper
      .avatar
        +block_size(35px)
        margin-right: 15px
      .info
        font-size: .8rem
        color: rgba($color_text, .7)
        font-weight: $font_weight_regular

.detail:nth-child(2)
  align-items: flex-end
  margin-top: -5px
  .separator
    height: 30px

</style>