<!-- 
-->

<template lang="pug">
.scroll-contents__right
  Topbar(:left="topbarConfig.left" :middle="topbarConfig.middle" :right="topbarConfig.right")
  .content__body
    .now_splitor {{ displayNowSplitor }}
    .payer-wrapper
      .payer-info
        span 由
        .payer(@click="toggleRecommendPayers")
          .avatar
            img(:src="record.payers.avatar")
          .name {{ record.payers.displayName }}
        span 支付
      .recommend-payers(v-if="isRecommendPayerActive")
        .recommend-payer(v-for="payer in recommendPayers" :key="payer.id" @click="setPayer(payer)")
          .avatar
            img(:src="payer.avatar")
          .name {{ payer.displayName }}
    .splitor-list
      .splitor-item(v-for="splitor in splitorList" :key="splitor" @click="changeSplitor(splitor.name)")
        .icon
          //- @todo: 這邊要計算條件縮成一個 function
          img(:src="currentSplitor === splitor.name ? splitor.iconActive : splitor.icon")
    .splitor-component-wrapper
      Equal(v-show="currentSplitor === 'Equal'")
      Fixed(v-show="currentSplitor === 'Fixed'")
      Ratio(v-show="currentSplitor === 'Ratio'")
      Percentage(v-show="currentSplitor === 'Percentage'")
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/editor'
import { useUserDataStore } from '@/store/userData'
import { storeToRefs } from 'pinia'
import { splitorList, getComplement as getComplementParticipant } from '@/utils/utils'
import type { Payer } from '@/types/types'
import Equal from './splitors/Equal.vue'
import Fixed from './splitors/Fixed.vue'
import Ratio from './splitors/Ratio.vue'
import Percentage from './splitors/Percentage.vue'

const splitorComponents = {
  Equal,
  Fixed,
  Ratio,
  Percentage
}

const editorStore = useEditorStore()
const { record, currentSplitor } = storeToRefs(editorStore)
const userDataStore = useUserDataStore()
const userData = userDataStore.$state

const isRecommendPayerActive = ref(false)
const recommendPayers = computed(() => getComplementParticipant([ ...record.value.participants ], [ record.value.payers ]))

const displayNowSplitor = computed(() => {
  const now = splitorList.find(splitor => splitor.name === currentSplitor.value)
  switch (now?.name) {
    case 'Equal':
      return '平均分擔'
    case 'Fixed':
      return '定值分擔'
    case 'Ratio':
      return '比例分擔'
    case 'Percentage':
      return '百分比分擔'
    default:
      return '有點出錯了'
  }
})

const changeSplitor = (splitor: string) => {
  currentSplitor.value = splitor
}

const toggleRecommendPayers = () => {
  isRecommendPayerActive.value = !isRecommendPayerActive.value
}

const setPayer = (payer: Payer) => {
  record.value.payers = { ...payer, paid: record.value.value }
  isRecommendPayerActive.value = false
}

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
  height: calc(100% - 43px)

.now_splitor
  padding: 60px 0
  text-align: center
  align-content: center
  font-size: 30px
  color: #5E5E5E
  font-weight: $font-weight-bold

.splitor-component-wrapper
  // NOTE: 這邊註解掉之後，高度就會跑下去了
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
// 所有 splitor 的共用 style
#splitor
  display: flex
  flex-direction: column
  // 撐滿高度 wrapper 的高度（其高度已確定佔滿剩下空間）
  height: 100%

.splitor__content
  // NOTE: 為什麼這邊要 overflow-y: auto ，還有 flex-grow: 1 呢？
  flex-grow: 1
  overflow-y: auto

.splitor__hinter
  // 推到底
  margin-top: auto
  color: #5E5E5E
  font-weight: $font-weight-bold
  background-color: #fff
  padding: 10px 15px
  box-shadow: 0px -3px 10px 0px rgba(black, 0.1)
  >*
    text-align: center
  .title
    font-size: 18px
    color: #5E5E5E
    margin-bottom: 5px
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
    font-size: 20px
    color: #929292
    font-weight: $font-weight-regular
  input
    text-align: right
    &::placeholder
      color: rgba(#5E5E5E, 0.2)
      font-size: 16px
      text-align: right
</style>

<style lang="sass" scoped>
.avatar
  +block-size(25px)
  border: 1px solid #000
  border-radius: 50%
  overflow: hidden
  img
    +block-size(100%)
    object-fit: cover

.payer-wrapper
  width: fit-content
  margin: 0 auto
  // +debug()

  // .avatar
  //   +block-size(25px)
  //   border: 1px solid #000
  //   border-radius: 50%
  //   overflow: hidden
  //   img
  //     +block-size(100%)
  //     object-fit: cover

  .payer-info
    display: flex
    align-items: center
    justify-content: center
    gap: 10px

  .payer
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px
    margin-right: 8px
    border: 1px solid #929292
    border-radius: 24px
    padding: 4px 14px 4px 12px
    color: #929292
  
  span
    color: #D5D5D5
    font-weight: $font-weight-regular


.recommend-payers
  position: absolute
  top: calc(100% + 10px)
  border: 1px solid #929292
  border-radius: 4px
  background-color: #fff
  z-index: 20
  
  .recommend-payer
    display: flex
    align-items: center
    gap: 8px
    padding: 6px 30px 6px 12px
    color: #929292

</style>
