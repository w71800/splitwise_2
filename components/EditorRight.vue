<template lang="pug">
.scroll-contents__right
  Topbar(:left="topbarConfig.left" :middle="topbarConfig.middle" :right="topbarConfig.right")
  h1 右邊
</template>

<script setup lang="ts">
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
.scroll-contents__right
  height: 100%
  width: 100vw
  flex-shrink: 0

</style>