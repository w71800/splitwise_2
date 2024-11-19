<!-- 
  @todo: 
  - 目前都是做空的新增資料，但要能夠接到在如果要編輯某個紀錄時的整包資料，且在編輯時，topbar 要為「編輯紀錄」
  - 要接測試資料進來
-->

<template lang="pug">
.editor(v-if="editorStore.isInitialized" :class="{ 'showing': isEditorShowing }" :style="{ height: editorHeight }")
  //- container 不動，改變的是 contents 的位置
  //- todo: 但想要把滾動的結構改成 container
  .scroll-container 
    .scroll-contents(:class="{ 'scrolled': isEditorScrolled }")
      EditorLeft
      EditorRight
</template>


<script setup lang="ts">
import { ref, provide } from 'vue'
import { useEditorStore } from '@/store/editor'

const editorStore = useEditorStore()

const { isEditorShowing, isEditorScrolled } = storeToRefs(editorStore)
const editorHeight = ref('100vh')

provide('isEditorScrolled', isEditorScrolled)

const scrollHandler = () => {
  isEditorScrolled.value = !isEditorScrolled.value
}

const setEditorHeight = () => {
  const vh = window.innerHeight * 0.01
  editorHeight.value = `${vh * 100}px`
}

onMounted(() => {
  setEditorHeight()
  window.addEventListener('resize', setEditorHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', setEditorHeight)
})
</script>


<style scoped lang="sass">
.editor
  position: fixed
  left: 0
  right: 0
  top: 0
  background-color: #fff
  z-index: 100
.scroll-container
  height: 100%
.scroll-contents
  width: 200vw
  height: 100%
  display: flex


.editor
  transition: transform 0.3s ease-in-out
  transform: translateY(100%)
  &.showing
    transform: translateY(0)
.scroll-contents
  transition: left 0.3s ease-in-out
  left: 0%
  &.scrolled
    left: -100%
</style>
