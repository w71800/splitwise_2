<template lang="pug">
#splitor
  .splitor__content
    .participants
      .participant(v-for="(division, index) in divisions" :key="division.id")
        .avatar
          img(:src="division.avatar ? division.avatar : '/avatars/default.png'")
        .name {{ division.displayName }}
          .value-hinter ${{ hinterValue(division.value) }}
        .input_wrapper
          input(type='number' name='participant' placeholder='30' v-model="divisions[index].value")
          label(for="participant") %
  .splitor__hinter
    .title 
      span 已分配 
      span {{ tempTotalValue }}%
    .subtitle(v-if="!settled") 
      span 還剩 
      span {{ remainingValue }}% 
      span 未分配
    .settled(v-else) 全部分配完了！
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useEditorStore } from '@/store/editor'
import { storeToRefs } from 'pinia'
import type { Division } from '@/types/types'

const editorStore = useEditorStore()
const { record, divisionsMapper } = storeToRefs(editorStore)
const totalValue = ref(record.value.value)

const divisions = computed({
  get: () => divisionsMapper.value.percentage,
  set: (newDivisions) => {
    divisionsMapper.value.percentage = newDivisions
  }
})
const tempTotalValue = computed(() => divisions.value.reduce((acc, curr) => acc + curr.value, 0))
const remainingValue = computed(() => 100 - tempTotalValue.value)
const settled = computed(() => remainingValue.value === 0)

const hinterValue = (value: number) => {
  return (record.value.value * (value / 100)).toFixed(2)
}

watch(
  () => [ record.value.participants, record.value.value ], 
  () => {
    divisions.value = record.value.participants.map((participant): Division => ({
      ...participant,
      value: 0
    }))
  },
  { deep: true }
)
</script>

<style scoped lang="sass">
.value-hinter
  position: absolute
  bottom: 0
  transform: translateY(100%)
  font-size: 12px
  color: #D5D5D5
  font-weight: $font-weight-regular

.subtitle
  span:nth-child(2)
    color: $color_secondary

.avatar
  border-radius: 50%
  overflow: hidden
  img
    width: 100%
    height: 100%
    object-fit: contain
</style>