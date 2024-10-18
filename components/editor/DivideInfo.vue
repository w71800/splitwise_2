<template lang="pug">
.divide_info(@click="isEditorScrolled = !isEditorScrolled")
  span 先由
  span.highlight {{ payers.displayName }}
  span 支付
  br
  span.highlight {{ splitorText }}
</template>

<script setup lang="ts">
import { ref, inject, computed, reactive } from 'vue'
import type { Participant, Record, User } from '@/types/types'
import { fakeUser, fakeFriends } from '@/data'
const editingRecord = inject('editingRecord') as Record
const { splitor, payers } = toRefs(editingRecord)

const isEditorScrolled = inject('isEditorScrolled') as Ref<boolean>

const splitorText = computed(() => {
  switch (splitor.value) {
    case 'equal':
      return '均等分配'
    case 'fixed':
      return '固定金額'
    case 'percentage':
      return '百分比'
    case 'ratio':
      return '比例'
    default:
      return '均等分配'
  }
})

</script>

<style scoped lang="sass">
.divide_info
  padding: 8px 20px
  border: 1px solid #929292
  border-radius: 8px
  font-size: 19px
  cursor: pointer
  text-align: center
  // margin: 0 auto
  span
    color: #929292
    font-weight: $font-weight-regular
    &.highlight
      display: inline-block
      color: $color-primary
      padding: 0px 5px
      font-weight: $font-weight-bold

</style>