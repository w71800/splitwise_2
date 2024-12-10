<template lang="pug">
.settlement-editor
  .background
  .editor
    .editor__title 結算設定
    .editor__settlements-list
      .editor__settlements-item
        .participants
          .debtor.is-user 你
          .arrow
            img(src="/icons/right-arrow.png")
          .creditor 李佩璇
        .settlement-info
          input(type="number").value
          .currency NTD
      .editor__settlements-item
        .participants
          .debtor.is-user 你
          .arrow
            img(src="/icons/right-arrow.png")
          .creditor 李佩璇
        .settlement-info
          input(type="number").value
          .currency NTD
    .editor__button 確定
</template>

<script setup lang="ts">
import { useSettlementsStore } from '@/store/settlements'

const settlementsStore = useSettlementsStore()

</script>

<style scoped lang="sass">
$color-simple: #929292
.settlement-editor
  +block_size(100vw, 100vh)
  position: fixed
  top: 0
  left: 0
  z-index: 999
  display: flex
  justify-content: center
  align-items: center

.background
  +block_size(100%)
  position: absolute
  left: 0
  top: 0
  backdrop-filter: blur(8px)
  -webkit-backdrop-filter: blur(8px)

.editor
  $editor-width: 400px
  width: $editor-width
  min-width: $editor-width
  padding: 20px 30px
  border: 1px solid #D5D5D5
  border-radius: 8px
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1)
  &__title
    font-size: 1.4rem
    font-weight: 600
    color: $color-simple
    text-align: center
    margin-bottom: 30px
    padding-bottom: 10px
    border-bottom: 1px solid #D5D5D5
  &__settlements-list
    margin-bottom: 30px
  &__settlements-item
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 20px
  &__button
    width: fit-content
    margin: 0 auto
    padding: 8px 12px
    border-radius: 6px
    background-color: $color-secondary
    color: white
    cursor: pointer
    box-shadow: 0 3px 0px 0 darken($color-secondary, 13%)
    transition: all 0.2s ease
    &:active
      box-shadow: none
      transform: translateY(3px)
  
  .participants
    display: grid
    grid-template-columns: 1fr 40px 1fr
    *
      color: $color-simple
    .debtor
      text-align: right
    *.is-user
      color: $color-primary
      font-weight: 600
  
  
  .arrow
    +block_size(20px)
    margin: 0 10px
    img
      +block_size(100%)
      object-fit: cover

  
  .settlement-info
    display: flex
    align-items: center
    justify-content: space-between
    gap: 10px
    *
      color: $color-simple
    input
      border: 1px solid $color-simple
      border-radius: 4px
      padding: 4px 8px
      width: 75px
</style>
