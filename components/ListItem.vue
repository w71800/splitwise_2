<!-- 
  @todo 
  - 點入朋友或群組之後，會跳轉到對應的詳細頁面，並條列出所有相關的帳目。裡面會抓到該朋友/群組的資訊（可能要從 store 中抓取？或者動態從 api 中取得並做計算？）
-->

<template lang="pug">
.list-item
  nuxt-link(:to="`/${sourcePath}/${id}`")
    .list-item__icon
      img(:src="avatar")
    .list-item__title
      h3 {{ title }}
</template>

<script setup lang="ts">
const { path } = useRoute()
const sourcePath = path.split('/')[1]
const props = defineProps<{
  id: string | number
  avatar: string
  name: string
}>()

const { id, avatar, name: title } = props
</script>

<style lang="sass" scoped>
.list-item
  padding: 10px
  border-bottom: 1px solid #e0e0e0
  color: $color_text
  & a
    width: 100%
    display: flex
    align-items: center
  &__icon
    width: 40px
    height: 40px
    border-radius: 50%
    overflow: hidden
    margin-right: 20px
    img
      width: 100%
      height: 100%
      object-fit: cover
</style>