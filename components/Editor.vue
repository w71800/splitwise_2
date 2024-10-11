<!-- 
  @todo: 目前都是做空的新增資料，但要能夠接到在如果要編輯某個紀錄時的整包資料，且在編輯時，topbar 要為「編輯紀錄」
-->

<template lang="pug">
.editor(:class="{ 'showing': isEditorShowing }")
  //- container 不動，改變的是 contents 的位置
  //- todo: 但想要把滾動的結構改成 container
  .scroll-container 
    .scroll-contents(:class="{ 'scrolled': isEditorScrolled }")
      EditorLeft
      EditorRight
</template>


<script setup lang="ts">
import { ref, inject, provide } from 'vue'

const isEditorShowing = inject('isEditorShowing') as Ref<boolean>
const isEditorScrolled = ref(false)
provide('isEditorScrolled', isEditorScrolled)

const scrollHandler = () => {
  isEditorScrolled.value = !isEditorScrolled.value
}
</script>


<style scoped lang="sass">
.scroll-container
  height: 100%
.scroll-contents
  width: 200vw
  display: flex
  height: 100%
.editor
  position: fixed
  left: 0
  right: 0
  top: 0
  +block_size(100vw, 100vh)
  background-color: #fff
  padding-top: 44px
  z-index: 100


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
