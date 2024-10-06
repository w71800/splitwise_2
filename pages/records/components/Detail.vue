<!-- 
  @TODO: 
  - 有沒有更好整合性寫法，可以將兩者整合在一起？（使用 v-if 有點浪費效能）
-->

<template lang="pug">
.detail.detail--payer(v-if="isPayer")
  .avatar 
    img(src="/avatars/profile.jpg")
  .info {{ displayInfo }}
.detail.detail--debtor(v-else)
  .separator
  .wrapper
    .avatar
      img(src="/avatars/profile.jpg")
    .info {{ displayInfo }}
</template>

<script setup lang="ts">
import type { Debt, Payer } from '@/types/types'

const props = defineProps<{
  isPayer: boolean
  debt: Debt
  payer: Payer
}>()

// const { debt } = toRefs(props) // NOTE: 這邊 debt 是 reactive 的，所以透過 toRefs 轉成 ref
const { debt: debtObj, isPayer, payer } = props


const displayInfo = computed(() => {
  if(isPayer) {
    const { displayName, paid } = payer
    return `${displayName}先付了 $${Math.abs(paid)}`
  } else {
    const { id, displayName, debt, creditor, shouldPay } = debtObj
    if(id === creditor.id) {
      return `${displayName} 應負擔 $${Math.abs(debt)}`
    } else {
      return `${displayName} 欠款 $${Math.abs(debt)}`
    }
  }
})
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