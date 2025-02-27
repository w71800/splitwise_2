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
          input(type='number' name='division' placeholder='1' v-model="divisions[index].value")
          label(for="division") 份
  .splitor__hinter
    .title 分擔人數 {{ activePeopleCount }} 人，共 
      span.settled {{ totalRatio }}
      span &nbsp;份
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useEditorStore } from '@/store/editor'
import { storeToRefs } from 'pinia'
import type { Division } from '@/types/types'

const editorStore = useEditorStore()
const { record, divisionsMapper } = storeToRefs(editorStore)

// NOTE: 透過 computed 去註冊 divisions，這樣 divisions 的值改變時，vue 會自動監聽到，並且更新 store 裡面的 divisionsMapper
const divisions = computed({
  get: () => divisionsMapper.value.ratio,
  set: (newDivisions) => {
    divisionsMapper.value.ratio = newDivisions
  }
})
const activePeopleCount = computed(() => divisions.value.filter((division) => division.value !== 0).length)
const totalRatio = computed(() => divisions.value.reduce((acc, curr) => acc + curr.value, 0))

const hinterValue = (ratio: number) => {
  if(totalRatio.value === 0) return 0
  return (record.value.value * (ratio / totalRatio.value)).toFixed(2)
}

watch(
  () => [ record.value.participants, record.value.value ], 
  () => {
    divisions.value = record.value.participants.map((participant): Division => ({
      ...participant,
      value: 1
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

.splitor__hinter
  padding: 20px 0
  .title
    margin-bottom: 0
    span:nth-child(1)
      font-weight: $font-weight-bold
      color: $color_secondary
      &.settled
        color: $color_primary

.avatar
  border-radius: 50%
  overflow: hidden
  img
    width: 100%
    height: 100%
    object-fit: contain
</style>