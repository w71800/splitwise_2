<template lang="pug">
.scroll-contents__right
  Topbar(:left="topbarConfig.left" :middle="topbarConfig.middle" :right="topbarConfig.right")
  .content__body
    .splitor {{ displaySplitor }}
    .splitor-list
      .splitor-item(v-for="splitor in splitorList" :key="splitor" @click="changeSplitor(splitor)")
        .icon
          //- @todo: 這邊要計算條件縮成一個 function
          img(:src="currentSplitor === splitor.name ? splitor.iconActive : splitor.icon")
    .splitor-component-wrapper
      component(:is="getSplitorComponent(currentSplitor)")
</template>

<script setup lang="ts">
import { inject, defineAsyncComponent } from 'vue'

const splitorList = ref([
  {
    name: 'Equal',
    icon: '/icons/equal.png',
    iconActive: '/icons/equal_active.png'
  },
  {
    name: 'Fixed',
    icon: '/icons/fixed.png',
    iconActive: '/icons/fixed_active.png'
  },
  {
    name: 'Ratio',
    icon: '/icons/ratio.png',
    iconActive: '/icons/ratio_active.png'
  },
  {
    name: 'Percent',
    icon: '/icons/percent.png',
    iconActive: '/icons/percent_active.png'
  }
])
const currentSplitor = ref('Equal')
const displaySplitor = computed(() => {
  const now = splitorList.value.find(splitor => splitor.name === currentSplitor.value)

  switch (now?.name) {
    case 'Equal':
      return '平均分擔'
    case 'Fixed':
      return '定值分擔'
    case 'Ratio':
      return '比例分擔'
    case 'Percent':
      return '百分比分擔'
    default:
      return '有點出錯了'
  }
})

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

const changeSplitor = (splitor: { name: string, icon: string, iconActive: string }) => {
  currentSplitor.value = splitor.name
}
const getSplitorComponent = (splitorName: string) => {
  return defineAsyncComponent(() => import(`./splitors/${splitorName}.vue`))
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
  height: calc(100% - 43px)

.splitor
  padding: 60px 0
  text-align: center
  align-content: center
  font-size: 30px
  color: #5E5E5E
  font-weight: $font-weight-bold

.splitor-component-wrapper
  overflow-y: scroll


.splitor-list
  display: flex
  justify-content: space-evenly
  gap: 5px
  align-items: center
  margin-bottom: 40px


.splitor-item
  width: calc(100% / 6)
  display: flex
  align-items: center
  justify-content: center
  .icon
    display: flex
    align-items: center
    justify-content: center
    img
      +block_size(100%)
      object-fit: contain

</style>


<style lang="sass">
#calculator
  display: flex
  flex-direction: column
  height: 100%

.calculator__content
  flex-grow: 1
  overflow-y: auto

.calculator__hinter
  margin-top: auto
  color: #5E5E5E
  font-weight: $font-weight-bold
  background-color: #fff
  padding: 8px 0px
  box-shadow: 0px -3px 10px 0px rgba(black, 0.1)
  >*
    text-align: center
    margin-bottom: 5px
  .title
    font-size: 19px
    color: #5E5E5E
  .subtitle
    font-size: 16px
    color: #929292
    font-weight: $font-weight-regular
    span:nth-child(2)
      color: $color_secondary
      font-weight: $font-weight-bold
  .settled
    color: $color_primary
    font-weight: $font-weight-regular


.participant
  display: flex
  align-items: center
  gap: 20px
  padding: 10px 15px
  .avatar
    +block-size(40px)
    object-fit: cover
    img
      +block-size(100%)
  .name
    margin-right: auto
    font-size: 16px
    color: #929292
    font-weight: $font-weight-regular
  
      
</style>