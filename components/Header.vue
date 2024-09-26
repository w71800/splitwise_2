<!-- 
  @todo: 這邊會從該群組中計算而得的 summary 資料
  1. 預計結構為 [ { displayName: '小華', status: '可回收', value: 1000 } ]
  2. 這個 summary 會直接從傳進來的 records 中計算得到
-->

<template lang="pug">
header.header
  .header__container
    h1.header__title {{ title }}
    .header__summary
      ul.summary__list
        li.summary__item(v-for="i in 3" :key="i")
          span.label 小華：
          span.status(:class="{ isPayer: true }") 可回收 
          span.value 1000 元
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