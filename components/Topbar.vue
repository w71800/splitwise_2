<!-- 
  @todo 
  - 修飾上一頁跳轉的流程：在有下一層頁面時，點選上一頁才會跳回上一層頁面（沒有的話不顯示箭頭？）
  - 加上搜尋送出（還有需要做嗎？還是要把搜尋功能統一在搜尋頁面？）
  - 改為白底綠字
-->

<template lang="pug">
.topbar
  .topbar__previous(@click="goBack")
    .icon
      img(src="/icons/left-arrow.png")
  .topbar__title
    h1.title 記帳
  .topbar__search(@click="toggleSearchInput")
    .icon
      img(src="/icons/search.png")
  .topbar__search-input(v-if="isSearchInputActive")
    input(type="text" placeholder="搜尋")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchInput = ref('')
const isSearchInputActive = ref(false)
const previousRoute = ref('')

const toggleSearchInput = () => {
  isSearchInputActive.value = !isSearchInputActive.value
}

const goBack = () => {
  if (previousRoute.value) {
    router.push(previousRoute.value)
    previousRoute.value = ''
  } else {
    router.back()
  }
}

const saveCurrentRoute = (to: any, from: any) => {
  previousRoute.value = from.fullPath
}

onMounted(() => {
  router.beforeEach(saveCurrentRoute)
})

onUnmounted(() => {
  router.beforeEach(() => {})
})
</script>

<style lang="sass" scoped>
.topbar
  // +debug
  position: fixed
  top: 0
  left: 0
  right: 0
  background-color: $color_primary
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 10px
  z-index: 100
  &__previous, &__search
    +block_size(20px)
    cursor: pointer
    img
      +block-size(100%)
      object-fit: contain
  &__title
    padding: 5px 0px
    font-size: .7rem
    color: #fff
  &__search-input
    position: absolute
    background-color: $color_primary
    bottom: 0
    left: 0
    right: 0
    transform: translateY(100%)
    padding: 10px 0px
    input
      display: block
      margin: 0 auto
      width: 90%
      height: 30px
      border-radius: 20px
      border: none
      outline: none
      background-color: #fff
      font-size: 1rem
      padding: 0 15px
      
</style>