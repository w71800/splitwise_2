<!-- 
  @todo 
  - 路由歷史紀錄，應該要用類似 stack 的結構來實作，或者直接從 pathList 來取得？
  - 之後如果使用 Editor 導入進來，要能夠顯示成文字按鈕。
  - 調整結構上的易讀性（可能使用 switch 配上生成對應的左右結構元件 component 來實作）
-->

<template lang="pug">
.topbar
  .topbar__left
    .icon(v-if="config.left?.type == 'icon'" @click="methodsMapper[config.left.method]")
      img(:src="config.left.icon")
    .text(v-if="config.left?.type == 'text'" @click="methodsMapper[config.left.method]")
      .text {{ config.left.text }}
  .topbar__title
    .text {{ config.middle }}
  .topbar__right
    .icon(v-if="config.right?.type == 'icon'" @click="methodsMapper[config.right.method]")
      img(:src="config.right.icon")
    .text(v-if="config.right?.type == 'text'" @click="methodsMapper[config.right.method]")
      .text {{ config.right.text }}
  SearchInput(v-if="isSearchInputActive")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import configMapper, { type Config } from '@/utils/topbarConfig'

const isEditorShowing = inject('isEditorShowing') as Ref<boolean>
const props = defineProps<Config>()
const route = useRoute()
const router = useRouter()
const currentPath = ref(route.path)
const previousRoute = ref('')
const isSearchInputActive = ref(false)

const pathList = computed(() => currentPath.value.split("/"))

// 優先使用 props 以串接從父元件來的組態設定。若沒有的話，使用從路由對照取得的組態
const config = computed(() => {
  if (props.left) {
    return props
  } else {
    const rootPath = pathList.value[1]
    const temp = configMapper[rootPath as keyof typeof configMapper]
    return pathList.value.length == 2
      ? { middle: temp.middle }
      : temp
  }
})


watch(() => route.path, (newPath, oldPath) => {
  currentPath.value = newPath
  previousRoute.value = `/${pathList.value[1]}`
  // todo: 如果是從 friends 或 gruops 跳轉到 records/id 的話，的確還是要抓到上一層
})

const methodsMapper = {
  'back': () => {
    router.push(previousRoute.value)
  },
  'edit': () => {
    isEditorShowing.value = true
    console.log(isEditorShowing.value)
  },
  'close': () => {
    isEditorShowing.value = false
  },
  'submit': () => {
    // todo: 與 store 溝通，將資料存入
  },
  'scrollBack': () => {
    // todo:scroll contents 滾回去
  },
  'save': () => {
    // todo: 將分擔方式寫入 temp obj 中
  }
}



onMounted(() => {
  previousRoute.value = `/${pathList.value[1]}`
})

// onUnmounted(() => {
//   router.beforeEach(() => {})
// })
</script>

<style lang="sass" scoped>
img
  +block-size(100%)
  object-fit: contain

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
  &__title
    padding: 5px 0px
    font-size: 1.5rem
    font-weight: $font_weight_regular
    color: $color_primary
      
</style>