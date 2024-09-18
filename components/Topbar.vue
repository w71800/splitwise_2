<!-- 
  @todo 
  - 加上搜尋送出（還有需要做嗎？還是要把搜尋功能統一在搜尋頁面？）
-->

<template lang="pug">
.topbar
  .topbar__previous(@click="goBack")
    .icon
      img(src="/icons/left-arrow.png" v-if="isPreviousActive")
  .topbar__title
    .text 記帳
  .topbar__search(@click="toggleSearchInput")
    .icon
      img(src="/icons/search_active.png")
  SearchInput(v-if="isSearchInputActive")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchInput = ref('')
const isSearchInputActive = ref(false)
const previousRoute = ref('')
const isPreviousActive = ref(false)
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
watch(() => router.currentRoute.value, (to) => {
  isPreviousActive.value = to.fullPath.split('/').length == 3
})
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
  background-color: #fff
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
    font-size: 1.5rem
    font-weight: $font_weight_bold
    color: $color_primary
      
</style>