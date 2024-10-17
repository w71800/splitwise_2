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
    :middle="topbarConfig.middle" 
    :right="topbarConfig.right"
  )
  ParticipantsList
  .editor__body
    .user_inputs
      .input_wrapper.item-name
        input(type="text" v-model="title" placeholder="項目名稱")
      .input_wrapper.value
        .icon.currency-btn(@click="isCurrencyListActive = !isCurrencyListActive")
          img(:src="'/icons/currency.png'")
          .currency-list(:class="{ 'active': isCurrencyListActive }")
            .currency-item(
              v-for="currency in currencyList" 
              :key="currency" 
              @click="setCurrency(currency)" 
              :class="{ 'active': currentCurrency === currency }"
            ) {{ currency }}
        input(
          type="text"
          v-model.number="value"
          placeholder="金額"
        )
        span.currency {{ currentCurrency }}
      .input_wrapper.date
        .icon
          img(:src="'/icons/calendar.png'")
        input(placeholder="2024-10-26")
    .divide_info(@click="isEditorScrolled = !isEditorScrolled")
      span 先由
      span.highlight {{ payers.displayName }}
      span 支付
      br
      span.highlight {{ splitorText }}
  .editor__footer
    .group(:class="{ 'inactive': isGroupEmpty }")
      .icon
        img(:src="groupIconSrc")
      span.no_exist(v-if="isGroupEmpty") 無
      span.group_name(v-else) {{ group.name }}
    .tags(:class="{ 'inactive': isTagsEmpty }")
      .icon
        img(:src="tagIconSrc")
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
import ParticipantsList from '@/components/editor/ParticipantsList.vue'

const props = defineProps<{
  record: Record
}>()
const { title, value, fullDate, participants, payers, splitor, group } = toRefs(props.record)

const isEditorShowing = inject('isEditorShowing') as Ref<boolean>
const isEditorScrolled = inject('isEditorScrolled') as Ref<boolean>


const tags = ref<string[]>([])
const currencyList = ref(['TWD', 'USD', 'JPY'])
const currentCurrency = ref('TWD')
const isCurrencyListActive = ref(false)
const isTagsEmpty = computed(() => tags.value.length === 0)
const tagIconSrc = computed(() => isTagsEmpty.value ? '/icons/tag_inactive.png' : '/icons/tag_active.png')
const isGroupEmpty = computed(() => group.value?.name.trim() == "")
const groupIconSrc = computed(() => isGroupEmpty.value ? '/icons/group_inactive.png' : '/icons/group_active.png')
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
// .icon
//   img
//     +block_size(100%)
//     object-fit: cover
  
.editor
  &__body
    padding: 0px 16px 
    width: 80%
    margin: 0 auto
    
    .user_inputs
      padding: 40px 0px
      display: flex
      flex-direction: column
      gap: 40px
      margin-bottom: 10px

      .input_wrapper
        display: flex
        align-items: center
        .icon
          +block_size(35px)
          margin-right: 20px
          flex-shrink: 0
        .icon.currency-btn
          cursor: pointer
          border: 2px solid #5E5E5E
          border-radius: 10px
          padding: 5px
        input
          font-size: 23px
          font-weight: $font-weight-bold
          border-bottom: 1px solid #5E5E5E
          text-align: left
          min-width: 100px
        input::placeholder
          color: rgba(#5e5e5e, 0.3)
      
      .input_wrapper 
        &.item-name
          input
            width: 100%
            text-align: center
        &.value, &.date
          margin-left: 10px

        &.value
          input
            width: 100%
          .currency
            font-weight: $font-weight-regular
            color: #5E5E5E
            font-size: 1rem
            margin-left: 20px

        &.date
          input
            width: 100%
      
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
        background-color: #fff
        z-index: 99
        .currency-item
          padding: 0 10px
          cursor: pointer
          text-align: left


    .divide_info
      padding: 8px 20px
      border: 1px solid #929292
      border-radius: 8px
      font-size: 19px
      cursor: pointer
      text-align: center
      // margin: 0 auto
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
  background-color: #fff
  >*
    display: flex
    align-items: center
    justify-content: center
  
  .group, .tags
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
  
  .tags
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

  .tags, .group
    &.inactive
      opacity: 0.3
  .group
    span
      color: $color-primary
    span.no_exist
      color: rgba(#929292, 1)


.currency-list
  &.active
    display: flex !important
  .currency-item
    &.active
      font-weight: $font-weight-bold
      color: $color-primary
</style>
