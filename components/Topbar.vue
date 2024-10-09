<!-- 
  @todo 
  - 加上搜尋送出（還有需要做嗎？還是要把搜尋功能統一在搜尋頁面？）
-->

<template lang="pug">
.topbar
  .topbar__left
    .icon(v-if="config.left")
      img(:src="config.left.icon")
  .topbar__title
    .text {{ config.middle }}
  .topbar__right
    .icon(v-if="config.right")
      img(:src="config.right.icon")
  SearchInput(v-if="isSearchInputActive")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import configs, { type Config } from '@/utils/topbarConfig'


const props = defineProps<Config>()
const route = useRoute()
const currentPath = ref(route.path)
const isSearchInputActive = ref(false)
const previousRoute = ref('')
const isPreviousActive = ref(false)

const pathList = computed(() => currentPath.value.split("/"))

// 優先使用 props 以串接從父元件來的組態設定。若沒有的話，使用從路由對照取得的組態
const config = computed(() => {
  if (props.left) {
    return props
  } else {
    const rootPath = pathList.value[1]
    const temp = configs[rootPath as keyof typeof configs]
    return pathList.value.length == 2
      ? { middle: temp.middle }
      : temp
  }
})

const toggleSearchInput = () => {
  isSearchInputActive.value = !isSearchInputActive.value
}

watch(() => route.path, (newPath) => {
  currentPath.value = newPath
})


// const goBack = () => {
//   if (previousRoute.value) {
//     router.push(previousRoute.value)
//     previousRoute.value = ''
//   } else {
//     router.back()
//   }
// }
// watch(() => router.currentRoute.value, (to) => {
//   isPreviousActive.value = to.fullPath.split('/').length == 3
// })
// const saveCurrentRoute = (to: any, from: any) => {
//   previousRoute.value = from.fullPath
// }

// onMounted(() => {
//   router.beforeEach(saveCurrentRoute)
// })

// onUnmounted(() => {
//   router.beforeEach(() => {})
// })
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
  &__left, &__right
    +block_size(20px)
    cursor: pointer
    img
      +block-size(100%)
      object-fit: contain
  &__title
    padding: 5px 0px
    font-size: 1.5rem
    font-weight: $font_weight_regular
    color: $color_primary
      
</style>