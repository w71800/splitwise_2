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
  padding: 8px 20px
  border: 1px solid #929292
  border-radius: 8px
  font-size: 19px
  cursor: pointer
  text-align: center
  box-shadow: 0px 7px 2px 0px rgba(lighten(#5e5e5e, 20), .7)
  span
    color: #929292
    font-weight: $font-weight-regular
    &.highlight
      display: inline-block
      color: $color-primary
      padding: 0px 5px
      font-weight: $font-weight-bold

</style>