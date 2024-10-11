<!-- 
  @todo 
  - 路由歷史紀錄，應該要用類似 stack 的結構來實作，或者直接從 pathList 來取得？
  - 之後如果使用 Editor 導入進來，要能夠顯示成文字按鈕。
-->

<template lang="pug">
.topbar
  .topbar__left(@click="methodsMapper[config.left.method]")
    NavigationButton(:option="config.left" class="left")
  .topbar__title
    .text {{ config.middle }}
  .topbar__right(@click="methodsMapper[config.right.method]")
    NavigationButton(:option="config.right" class="right")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import configMapper, { type Config, type Icon, type Text } from '@/utils/topbarConfig'

const isEditorShowing = inject('isEditorShowing') as Ref<boolean>
const isEditorScrolled = inject('isEditorScrolled') as Ref<boolean>
const props = defineProps<Config>()
const route = useRoute()
const router = useRouter()
const currentPath = ref(route.path)
const previousRoute = ref('')

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

// todo: 調整命名，改成更易讀的方式。例如 back 是什麼東西 back？
const methodsMapper = {
  'back': () => {
    router.push(previousRoute.value)
  },
  'edit': () => {
    isEditorShowing.value = true
  },
  'close': () => {
    isEditorShowing.value = false
  },
  'submit': () => {
    // todo: 與 store 溝通，將資料存入
  },
  'scrollBack': () => {
    isEditorScrolled.value = false
    console.log("scrollBack")
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