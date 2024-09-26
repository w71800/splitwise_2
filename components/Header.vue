<!-- 
  @todo: 修飾一下 summary 的呈現
-->

<template lang="pug">
header.header
  .header__container
    h1.header__title {{ title }}
    .header__summary
      ul.summary__list
        li.summary__item(v-for="item in summary" :key="item.displayName")
          span.label {{ item.displayName }}：
          span.status(:class="{ isPayer: item.status === '可回收' }") {{ item.status }} 
          span.value {{ Math.abs(item.value) }} 元
</template>
  
<script setup lang="ts">
defineProps<{
  title: string
  summary: {
    displayName: string
    status: string
    value: number
  }[]
}>()
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

.summary__item
  span.status
    font-weight: $font_weight_medium
    &.isPayer
      color: $color_primary
    &:not(.isPayer)
      color: $color_secondary
</style>