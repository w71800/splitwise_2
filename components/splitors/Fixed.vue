<template lang="pug">
#splitor
  .splitor__content
    .participants
      .participant(v-for="(division, index) in divisions" :key="division.id")
        .avatar
          img(:src="division.avatar ?? '/avatars/default.png'")
        .name {{ division.displayName }}
        .input_wrapper.value_is_exist
          label(for="participant") $
          input(type='number' name='participant' placeholder='30' v-model="divisions[index].value")
  .splitor__hinter
    .title 
      span 已分配 
      span ${{ totalValue }}
      span &nbsp;中的&nbsp;
      span ${{ tempTotalValue }}
    .settled(v-if="settled") 全部分配完了！
    .subtitle(v-else) 
      span 剩餘 
      span ${{ remainingValue }}
      span &nbsp;未分配
</template>
  
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useEditorStore } from '@/store/editor'
import { storeToRefs } from 'pinia'
import type { Division } from '@/types/types'

const editorStore = useEditorStore()
const { record, divisionsMapper } = storeToRefs(editorStore)
const divisions = computed({
  get: () => divisionsMapper.value.fixed,
  set: (newDivisions) => {
    divisionsMapper.value.fixed = newDivisions
  }
})

const totalValue = computed(() => record.value.value)
const tempTotalValue = computed(() => divisions.value.reduce((acc, curr) => acc + curr.value, 0))
const remainingValue = computed(() => totalValue.value - tempTotalValue.value)
const settled = computed(() => remainingValue.value === 0)

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
.avatar
  border-radius: 50%
  overflow: hidden
  img
    width: 100%
    height: 100%
    object-fit: contain
</style>