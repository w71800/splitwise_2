<!-- 
  @todo:
  - 如何將這個地方也吃到一些 Editor 中的共用樣式？
  - 如何讓推薦參與者列表展開？
  - 點擊推薦參與者時，如何將其加入到 chosenParticipants 中？
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
        input(type="text" placeholder="鱔魚意麵")
      .input_wrapper
        span.currency 
          span $
        input(type="text" placeholder="90")
        span.unit 元
    .divide_hinter(@click="isEditorScrolled = !isEditorScrolled")
      span 先由
      span.highlight {{ payer?.displayName ? payer.displayName : "我" }}
      span 支付，
      span.highlight {{ payer?.method ? payer.method : "均等分配" }}
  .editor__footer
    .date
      .icon
        img(:src="'/icons/calendar.png'")
      input(type="text" placeholder="2024-08-01")
      span.today_hint （今天）
    .group
      .icon
        img(:src="'/icons/group_active.png'")
      span.group_name 家庭事項
    .tags
      .icon
        img(:src="'/icons/tag_active.png'")
      //- .tag(v-for="tag in tags" :key="tag") {{ `#${tag}` }}
      input(type="text" @input="setAdjustWidth($event.target)" @blur="setPoundSign($event.target)")
      input(type="text")

</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Participant } from '@/types/types'

const isEditorShowing = inject('isEditorShowing') as Ref<boolean>
const isEditorScrolled = inject('isEditorScrolled') as Ref<boolean>
const isRecommendListActive = ref(false)

// 假資料：已選擇的參與者
const chosenParticipants = ref<Participant[]>([
  {
    id: '1',
    displayName: '張三',
    tags: ['朋友', '同事'],
    avatar: '/avatars/profile.jpg'
  },
  {
    id: '2',
    displayName: '李四',
    email: 'lisi@example.com',
    avatar: '/avatars/profile.jpg'
  }
])


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

const setPoundSign = (el: HTMLInputElement) => {
  el.value = `#${el.value}`
}


</script>

<style lang="sass" scoped>
// todo: 調整 topbar 的樣式，這樣太醜了。還有如何在 topbar 為 fixed 時，讓 scroll-contents__left 的高度正確？（Editor 目前有個 44 的 pt，以容納 topbar）
.topbar
  position: absolute
  top: -44px
  left: 0
  right: 0
.scroll-contents__left
  height: calc(100vh - 44px)
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
          color: #5E5E5E
          font-size: 27px
          font-weight: $font-weight-bold
        &.currency
          text-align: right
          padding-right: 20px
          cursor: pointer
          vertical-align: bottom
          span
            text-align: center
            align-content: center
            display: inline-block
            border: 1px solid #5E5E5E
            border-radius: 10px
            +block_size(48px)
      input
        border: none
        border-bottom: 1px solid #5E5E5E
        font-size: 27px
        margin-right: 10px
        width: 200px
        &::placeholder
          color: rgba(#5E5E5E, 0.3)
          font-weight: $font-weight-bold

    .divide_hinter
      padding: 5px 60px
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


.editor__footer
  position: absolute
  left: 0
  right: 0
  bottom: 0
  display: flex
  gap: 16px
  padding: 16px 16px
  border-top: 2px solid #D5D5D5
  >*
    display: flex
    align-items: center
    justify-content: center
  .date, & .group, & .tags
    margin-right: 10px
    .icon
      +block_size(20px)
      margin-right: 6px
    img
      +block_size(100%)
      object-fit: cover
    input
      border: none
      font-size: 12px
      color: #929292
    span
      white-space: nowrap
      font-size: 12px
      color: #929292
  .date
    color: #929292
    input
      width: 80px
  .group
    span
      color: $color-primary
  .tags
    input
      color: $color-primary


.recommend-participants
  &.active
    height: auto
</style>
