<!-- 
  @todo: 
  - 修飾一下 summary 的呈現，或許可以把結構抽離出來作為一個元件
  - 撰寫 summary 的單元測試

-->

<template lang="pug">
header.header
  .header__container
    h1.header__title {{ title }}
    .summary
      ul.summary__list
        li.summary__item(
          v-for="item in summary" 
          :key="item.displayName"
        )
          span.summary__label {{ displayLabel(item) }}
          span.summary__status(:class="statusClass(item)") {{ `${item.status} ` }} 
          span.summary__value {{ Math.abs(item.value) }} 元
</template>
  
<script setup lang="ts">
import { computed } from 'vue'
import type { Summary } from '@/types/types'
import { useUserDataStore } from '@/store/userData'

const { id: userId } = useUserDataStore()

const props = defineProps<{
  title: string
  summary: Summary[]
}>()

const displayLabel = computed(() => {
  return (item: Summary['partial'][number]) => `${item.id === userId ? '我' : item.displayName}：`
})

const statusClass = computed(() => {
  return (item: Summary['partial'][number]) => {
    if (item.status === '可回收') {
      return 'isPayer'
    }
    return ''
  }
})
</script>

<style lang="sass" scoped>
.header
  margin-bottom: 16px
  &__container
    padding: 0 16px
    border-bottom: 1px solid #888
  &__title
    font-size: 24px
    font-weight: 700
    color: #555
  &__summary
    font-size: 14px
    color: #888

.summary
  &__list
    padding: 0 16px
  &__item
    list-style: none
    margin-bottom: 8px
  &__label
    font-weight: 700
    color: #555
  &__status
    font-weight: 700
    &.isPayer
      color: $color_primary
    &:not(.isPayer)
      color: $color_secondary
</style>