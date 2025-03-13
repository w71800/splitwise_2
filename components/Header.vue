<!-- 
  @todo: 
  - 修飾一下 summary 的呈現，或許可以把結構抽離出來作為一個元件
  - 撰寫 summary 的單元測試

-->

<template lang="pug">
header.header
  .header__container
    .header__hero
      img(src="/imgs/hero.png")
    .header__avatar
      img(src="/avatars/default.png")
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
@keyframes parallax-avatar
  from
    transform: translateY(0px)
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, .5)
  to
    transform: translateY(-50px)
    box-shadow: 6px 6px 5px 0 rgba(0, 0, 0, .5)

@keyframes parallax-hero
  from
    transform: translateY(0px)
  to
    transform: translateY(20px)
  
.header
  margin-bottom: 16px
  &__container
    // border-bottom: 1px solid #888
  &__title
    padding: 0 20px
  &__title
    font-size: 24px
    font-weight: 700
    color: #555
  &__hero
    +block_size(100%, 200px)
    background-color: $color_primary
    margin-bottom: 70px
    animation: parallax-hero linear 1s
    animation-timeline: scroll()
  &__avatar
    --size: 100px
    border-radius: 50%
    border: 5px solid $color_primary
    +block_size(var(--size))
    background-color: white
    position: absolute
    left: 20px
    top: calc(200px - 50px)
    +flex_center()
    animation: parallax-avatar linear 1s
    animation-timeline: scroll()

  &__hero
    opacity: 0.8
    img
      +img_fullwidth
  &__avatar
    img
      border-radius: 50%
      +img_fullwidth(90%)
  
.summary
  padding: 0 20px
  font-size: 14px
  color: #888
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