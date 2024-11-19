<!-- 
  @todo:
  - 如何將這個地方也吃到一些 Editor 中的共用樣式？
  - 或許將 body 和 footer 拆成兩個元件？
  - 把日期拉到 body 中做，並用套件做一個選單
  - 根據新的稿子進行調整（尤其是 body 中的 user_inputs 內部結構的命名有點混亂）
  - 推薦者一旦被選了，就要消失
-->

<template lang="pug">
.scroll-contents__left
  Topbar(
    :left="topbarConfig.left" 
    :right="topbarConfig.right"
  )
  ParticipantsList
  .editor__body
    InputArea
    DivideInfo
  Footer

</template>

<script setup lang="ts">
import ParticipantsList from '@/components/editor/ParticipantsList.vue'
import InputArea from '@/components/editor/InputArea.vue'
import DivideInfo from '@/components/editor/DivideInfo.vue'
import Footer from '@/components/editor/Footer.vue'
import { useEditorStore } from '@/store/editor'

const { isEditorShowing, isEditorScrolled } = storeToRefs(useEditorStore())

const topbarConfig = {
  left: {
    type: 'icon',
    icon: '/icons/close.png',
    method: 'close'
  },
  middle: '新增',
  right: {
    type: 'icon',
    icon: '/icons/submit.png',
    method: 'submit'
  }
}
</script>

<style lang="sass" scoped>
.scroll-contents__left
  height: 100%
  width: 100vw
  flex-shrink: 0
.avatar
  +block_size(32px)
  border-radius: 50%
  overflow: hidden
  img
    width: 100%
    height: 100%
    object-fit: cover
// .icon
//   img
//     +block_size(100%)
//     object-fit: cover
  
.editor__body
  padding: 0px 16px 
  width: 80%
  margin: 0 auto

</style>
