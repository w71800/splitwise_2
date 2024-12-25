<!-- 
  從這邊生成 divisions 
-->

<template lang="pug">
#splitor
  .splitor__content
    .participants
      .participant(v-for="division in divisions" :key="division.id")
        label(:for="`division${division.id}`")
        .avatar
          img(:src="division.avatar ? division.avatar : '/avatars/default.png'")
        .name {{ division.displayName }}
        .input_wrapper
          input(
            type='checkbox' 
            name='division' 
            :id="`division${division.id}`" 
            :checked="isActive(division.value)" 
            @change="setValue(division, $event)"
          )
  .splitor__hinter
    .title 
      span {{ activePeopleCount }} 人分擔，每人分擔 ${{ eachValue }}
    .divider
    .select_all
      span 全選
      input(
        type='checkbox' 
        @click="selectAll($event)"
        :checked="isAllActive"
      )
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useEditorStore } from '@/store/editor'
import { storeToRefs } from 'pinia'
import type { Division } from '@/types/types'

const editorStore = useEditorStore()
const { record, divisionsMapper } = storeToRefs(editorStore)
const divisions = computed({
  get: () => divisionsMapper.value.equal,
  set: (newDivisions) => {
    divisionsMapper.value.equal = newDivisions
  }
})

const isAllActive = computed(() =>  divisions.value.every((division) => division.value !== 0))
const activePeopleCount = computed(() => divisions.value.filter((division) => division.value !== 0).length)
const eachValue = computed(() => {
  if (activePeopleCount.value === 0) return 0
  return parseFloat((record.value.value / activePeopleCount.value).toFixed(2))
})


const isActive = (value: number) => value !== 0 


const setValue = (division: Division, event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (isChecked) {
    division.value = 1
  } else {
    division.value = 0
  }
  
  let activePeopleCount = divisions.value.filter((division) => division.value !== 0).length
  divisions.value.forEach((division) => {
    if(division.value !== 0) {
      division.value = record.value.value / activePeopleCount
    }
  })
}


const selectAll = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (isChecked) {
    divisions.value.forEach((division) => {
      division.value = record.value.value / record.value.participants.length
    })
  } else {
    divisions.value.forEach((division) => {
      division.value = 0
    })
  }
}


// 在參與者變多或變少時、總金額變動時，重新生成 divisions
watch(
  () => [ record.value.participants, record.value.value ], 
  () => {
    divisions.value = record.value.participants.map((participant): Division => ({
      ...participant,
      value: record.value.value / record.value.divisions.length
    }))
  },
  { deep: true } // 也監聽到 participants 內元素的變化
)

watch(() => record.value.value, () => {
  record.value.payers.paid = record.value.value
})
</script>

<style scoped lang="sass">
label
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  z-index: 1

.splitor__hinter
  display: flex
  align-items: center

.title
  flex-grow: 3
  margin-bottom: 0px !important
  margin-right: 20px

.divider
  height: 40px
  border: 1px solid #D5D5D5
  margin-right: 20px

.select_all
  flex-basis: auto
  flex-shrink: 0
  display: flex
  align-items: center
  justify-content: flex-end
  gap: 20px

.avatar
  border-radius: 50%
  overflow: hidden
  img
    width: 100%
    height: 100%
    object-fit: contain
</style>
