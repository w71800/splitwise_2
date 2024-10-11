<template lang="pug">
.scroll-contents__right
  Topbar(:left="topbarConfig.left" :middle="topbarConfig.middle" :right="topbarConfig.right")
  h1 右邊
</template>

<script setup lang="ts">
import { inject } from 'vue'



const topbarConfig = {
  left: {
    type: 'text',
    text: '取消',
    method: 'scrollBack'
  },
  middle: '分擔方式選擇',
  right: {
    type: 'text',
    text: '確定',
    method: 'save'
  }
}

</script>

<style scoped lang="sass">
// todo: 這邊的處理太醜了。這樣的處理是因為原先的 fixed 是無法跟著 scroll 的。
.topbar
  position: absolute
  top: -44px
  left: 0
  right: 0
.scroll-contents__right
  height: 100%
  width: 100vw
  flex-shrink: 0

</style>