<!-- 
  @todo:
  - 如何將這個地方也吃到一些 Editor 中的共用樣式？
  - 如何讓推薦參與者列表展開？
  - 點擊推薦參與者時，如何將其加入到 chosenParticipants 中？
  - 或許將 body 和 footer 拆成兩個元件？
  - 把日期拉到 body 中做，並用套件做一個選單
  - 根據新的稿子進行調整（尤其是 body 中的 user_inputs 內部結構的命名有點混亂）

-->

<template lang="pug">
.scroll-contents__left
  Topbar(:left="topbarConfig.left" :middle="topbarConfig.middle" :right="topbarConfig.right")
  .editor__participants
    .participants-list
      .label 和：
      .participants-item(v-for="participant in chosenParticipants" :key="participant.id") 
        .avatar
          img(:src="participant.avatar")
        .name {{ participant.displayName }}
        .remove
          img(:src="'/icons/remove.png'")
    .recommend-participants(:class="{ 'active': isRecommendListActive }")
      .recommend-item(v-for="participant in recommendParticipants" :key="participant.id") 
        .avatar
          img(:src="participant.avatar")
        span {{ participant.displayName }}
  .editor__body
    .user_inputs
      .input_wrapper
        span.label 項目：
        input(type="text" v-model="title" placeholder="鱔魚意麵")
      .input_wrapper 
        span.currency(@click="isCurrencyListActive = !isCurrencyListActive") $
          .currency-list(:class="{ 'active': isCurrencyListActive }")
            .currency-item(
              v-for="currency in currencyList" 
              :key="currency" 
              @click="setCurrency(currency)" 
              :class="{ 'active': currentCurrency === currency }"
            ) {{ currency }}
        input(type="text" v-model.number="value" placeholder="90")
        span.unit {{ currentCurrency }}
    .divide_info(@click="isEditorScrolled = !isEditorScrolled")
      span 先由
      span.highlight {{ payers.displayName }}
      span 支付，
      span.highlight {{ splitorText }}
  .editor__footer
    .group
      .icon
        img(:src="'/icons/group_active.png'")
      span.group_name 家庭事項
    .tags
      .icon
        img(:src="'/icons/tag_active.png'")
      //- todo: 如何處理新加上 tag ？
      .tag(v-for="(tag,index) in tags" :key="tag")
        label #
        input(type="text" @input="setAdjustWidth($event.target)" v-model="tags[index]")
      .add_tag(@click="addTag")
        .icon
          img(:src="'/icons/add.png'")

</template>

<script setup lang="ts">
import { ref, inject, computed, reactive } from 'vue'
import type { Participant, Record, User } from '@/types/types'
import { fakeUser, fakeFriends } from '@/data'

const props = defineProps<{
  record: Record
}>()
const { title, value, fullDate, participants, payers, splitor, group } = toRefs(props.record)

const isEditorShowing = inject('isEditorShowing') as Ref<boolean>
const isEditorScrolled = inject('isEditorScrolled') as Ref<boolean>
const isRecommendListActive = ref(false)

const tags = ref<string[]>([])
const currencyList = ref(['TWD', 'USD', 'JPY'])
const currentCurrency = ref('TWD')
const isCurrencyListActive = ref(false)
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

const splitorText = computed(() => {
  switch (splitor.value) {
    case 'equal':
      return '均等分配'
    case 'fixed':
      return '固定金額'
    case 'percentage':
      return '百分比'
    case 'ratio':
      return '比例'
    default:
      return '均等分配'
  }
})

const setAdjustWidth = (el: HTMLInputElement) => {
  // 創建一個隱藏的 span 元素來測量文字寬度
  const span = document.createElement('span')
  span.style.visibility = 'hidden'
  span.style.position = 'absolute'
  span.style.whiteSpace = 'pre'
  
  // 複製 input 的字體樣式到 span
  const styles = window.getComputedStyle(el)
  span.style.font = styles.font
  span.style.fontSize = styles.fontSize
  span.style.fontFamily = styles.fontFamily
  span.style.fontWeight = styles.fontWeight
  span.style.letterSpacing = styles.letterSpacing

  // 將 span 添加到文檔中
  document.body.appendChild(span)

  // 設置 span 的文字內容為 input 的值
  span.textContent = el.value || el.placeholder

  // 獲取文字寬度並設置 input 的寬度
  const textWidth = span.offsetWidth
  el.style.width = `${textWidth + 20}px` // 加 20px 作為緩衝

  // 移除 span
  document.body.removeChild(span)
}

const removeEmptyTag = () => {
  tags.value = tags.value.filter(tag => tag.trim() !== '')
}

const addTag = () => {
  tags.value.push('')
}

const setCurrency = (currency: string) => {
  currentCurrency.value = currency
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

.editor
  &__participants
    .participants-list
      align-items: center
      display: flex
      gap: 10px
      padding: 10px 16px
      border-top: 2px solid rgba(#929292, 0.3)
      border-bottom: 2px solid rgba(#929292, 0.3)
    .label
      color: #D5D5D5
      font-weight: $font-weight-bold
    .participants-item
      align-items: center
      display: flex
      justify-content: space-between
      gap: 10px
      margin-right: 8px
      border: 1px solid #929292
      border-radius: 24px
      padding: 6px 16px 6px 10px
      .avatar
        +block_size(24px)
        border: 1px solid #000
      .name
        color: #929292
      .remove
        +block_size(13px)
        cursor: pointer
        opacity: 0.3
        font-size: 0
        img
          width: 100%
          height: 100%
          object-fit: cover
    
    // todo: 加上展開時的過渡效果
    .recommend-participants
      height: 0
      overflow: hidden
      transition: height 0.3s ease
      .recommend-item
        display: flex
        align-items: center
        gap: 10px
        border-bottom: 1px solid #D5D5D5
        padding: 10px 16px
      .avatar
        border: 1px solid #929292
      span
        color: #929292
  

  &__body
    padding: 16px 
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 80px
    // +debug
    .user_inputs
      padding: 40px 0
      display: flex
      justify-content: space-around
      flex-direction: column
      gap: 40px
      span
        &.label, &.currency
          display: inline-block
          color: #5E5E5E
          font-size: 27px
          font-weight: $font-weight-bold
          width: 90px
        &.unit
          display: inline-block
          color: #5E5E5E
          font-size: 20px
          font-weight: $font-weight-bold
          width: 10px
        &.currency
          +block_size(48px)
          cursor: pointer
          vertical-align: bottom
          text-align: center
          align-content: center
          border: 1px solid #5E5E5E
          border-radius: 10px
          margin-right: 40px
      input
        border: none
        border-bottom: 1px solid #5E5E5E
        font-size: 27px
        margin-right: 10px
        width: 200px
        &::placeholder
          color: rgba(#5E5E5E, 0.3)
          font-weight: $font-weight-bold

      .currency-list
        display: none
        position: absolute
        border: 1px solid #000
        border-radius: 6px
        bottom: 0px
        left: 50%
        transform: translateX(-50%) translateY(calc(100% + 10px))
        font-size: 1rem
        flex-direction: column
        gap: 10px
        padding: 10px 0px
        .currency-item
          padding: 0 10px
          cursor: pointer
          text-align: left

    .divide_info
      padding: 8px 30px
      border: 1px solid #929292
      border-radius: 8px
      font-size: 19px
      cursor: pointer
      span
        color: #929292
        font-weight: $font-weight-regular
        &.highlight
          display: inline-block
          color: $color-primary
          padding: 0px 5px
          font-weight: $font-weight-bold

// bug: 以目前的狀況，發現在手機上 footer 會跑到螢幕下面，為什麼會這樣
.editor__footer
  position: absolute
  left: 0
  right: 0
  bottom: 0
  display: flex
  gap: 16px
  padding: 16px 16px
  border-top: 2px solid #D5D5D5
  z-index: 999
  >*
    display: flex
    align-items: center
    justify-content: center
  
  & .group, & .tags
    margin-right: 10px
    display: flex
    align-items: center
    gap: 8px
    color: rgba($color-primary, 0.7)
    font-size: 12px
    .icon
      +block_size(20px)
    img
      +block_size(100%)
      object-fit: cover
    input
      font-size: 12px
      outline: none
      border: 1px solid white
      color: #929292
      padding-left: 0px
      &:focus
        border: 1px solid $color-primary
  
  & .tags
    input
      color: $color-primary
    .tag
      display: flex
      align-items: center
      label
        color: rgba($color-primary, 0.7)
        font-weight: $font-weight-bold
        font-size: 12px
      input
        padding-right: 0
        width: 4rem
    .add_tag
      cursor: pointer
      .icon
        +block_size(16px)
        img
          +block_size(100%)
          object-fit: cover


.recommend-participants
  &.active
    height: auto

.currency-list
  &.active
    display: flex !important
  .currency-item
    &.active
      font-weight: $font-weight-bold
      color: $color-primary
</style>