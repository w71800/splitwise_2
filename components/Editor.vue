<!-- 
  @todo:
  - 把左右兩邊抽出來成一個元件
-->

<template lang="pug">
.editor.showing(:class="{ 'showing': isEditorShowing }")
  //- container 不動，改變的是 contents 的位置
  .scroll-container 
    .scroll-contents
      EditorLeft
      EditorRight
</template>

<script setup lang="ts">

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
