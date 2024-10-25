<!-- 
  從這邊生成 divisions 
-->

<template lang="pug">
#splitor
  .splitor__content
    .participants
      .participant(v-for="division in record.divisions" :key="division.id")
        label(:for="`division${division.id}`")
        .avatar
          img(:src="division.avatar")
        .name {{ division.displayName }}
        .input_wrapper
          input(
            type='checkbox' 
            name='division' 
            :id="`division${division.id}`" 
            :checked="isChecked(division.value)" 
            @change="setValue(division, $event)"
          )
  .splitor__hinter
    .title 
      span {{ validPeopleNum }} 人分擔，每人分擔 ${{ eachValue }}
    .divider
    .select_all
      span 全選
      input(
        type='checkbox' 
        @click="selectAll($event)"
        :checked="isAllChecked"
      )
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEditorStore } from '@/store/editor'
import { storeToRefs } from 'pinia'
import type { Division } from '@/types/types'

const editorStore = useEditorStore()
const { record } = storeToRefs(editorStore)

const isAllChecked = computed(() => record.value.divisions.every((division) => division.value !== 0))
const validPeopleNum = computed(() => record.value.divisions.filter((division) => division.value !== 0).length)
const eachValue = computed(() => {
  if (validPeopleNum.value === 0) return 0
  return parseFloat((record.value.value / validPeopleNum.value).toFixed(2))
})

const isChecked = (value: number) => {
  return value !== 0
}

const setValue = (division: Division, event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (isChecked) {
    division.value = 1
  } else {
    division.value = 0
  }
  
  let validPeopleNum = record.value.divisions.filter((division) => division.value !== 0).length
  record.value.divisions.forEach((division) => {
    if(division.value !== 0) {
      division.value = record.value.value / validPeopleNum
    }
  })
}

const selectAll = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (isChecked) {
    record.value.divisions.forEach((division) => {
      division.value = record.value.value / record.value.participants.length
    })
  } else {
    record.value.divisions.forEach((division) => {
      division.value = 0
    })
  }
}

// 在參與者變多或變少時、總金額變動時，重新生成 divisions
watch(
  () => [ record.value.participants, record.value.value ], 
  () => {
    record.value.divisions = record.value.participants.map((participant): Division => ({
      ...participant,
      value: record.value.value / record.value.divisions.length
    }))
  },
  { deep: true } // 也監聽到 participants 內元素的變化
)

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
  margin-bottom: 0
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
</style>
