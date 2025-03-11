<template lang="pug">
.divide_info(@click="isEditorScrolled = !isEditorScrolled")
  span 先由
  span.highlight {{ displayPayer }}
  span 支付
  br
  span.highlight {{ splitorText }}
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { useEditorStore } from '@/store/editor'
import { useUserDataStore } from '@/store/userData'
import { storeToRefs } from 'pinia'

const editorStore = useEditorStore()
const { record } = storeToRefs(editorStore)
const { id: userId } = storeToRefs(useUserDataStore())

const displayPayer = computed(() => userId.value === record.value.payers?.id ? "你" : record.value.payers?.displayName)

const isEditorScrolled = inject('isEditorScrolled') as Ref<boolean>

const splitorText = computed(() => {
  switch (record.value.splitor) {
    case 'equal':
      return '均等分擔'
    case 'fixed':
      return '固定金額分擔'
    case 'percentage':
      return '百分比分擔'
    case 'ratio':
      return '比例分擔'
    default:
      return '均等分擔'
  }
})
</script>

<style scoped lang="sass">
.divide_info
  padding: 12px 20px  
  border: 1px solid #929292
  border-radius: 10px  
  font-size: 19px
  cursor: pointer
  text-align: center
  box-shadow: 0px 3px 6px 0px rgba(94, 94, 94, 0.3)  
  position: relative  
  transition: all 0.2s ease  
  background-color: white  
  
  span
    color: #6a6a6a  
    font-weight: $font-weight-regular
    transition: color 0.2s ease  
    
    &.highlight
      display: inline-block
      color: $color-primary  
      padding: 0px 5px
      font-weight: $font-weight-bold
  
  
  &:hover
    transform: translateY(-2px)  
    box-shadow: 0px 5px 8px 0px rgba(94, 94, 94, 0.4)  
    border-color: $color-primary  
  
  &.active
    border-color: $color-primary
    box-shadow: 0px 3px 8px 0px rgba($color-primary, 0.3)
      
    &:before
      content: ''
      position: absolute
      left: 0
      top: 0
      height: 100%
      width: 4px
      background-color: $color-primary
      border-top-left-radius: 10px
      border-bottom-left-radius: 10px
  
  &:active
    transform: translateY(1px)  
    box-shadow: 0px 2px 4px 0px rgba(94, 94, 94, 0.25)  

</style>