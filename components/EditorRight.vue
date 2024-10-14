<template lang="pug">
.scroll-contents__right
  Topbar(:left="topbarConfig.left" :middle="topbarConfig.middle" :right="topbarConfig.right")
  .content__body
    .splitor 平均分擔
    .splitor-list
      .splitor-item(v-for="splitor in splitorList" :key="splitor") {{ splitor }}
    .test
    //- component(:is="currentSplitor")
</template>

<script setup lang="ts">
import { inject } from 'vue'

const splitorList = ref(['平均分擔', '指定分擔'])

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

.content__body
  display: grid
  grid-template-rows: auto auto 1fr
  height: calc(100% - 44px)

.splitor
  padding: 40px 0
  text-align: center
  align-content: center

.test
  background-color: #000

</style>