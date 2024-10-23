<!-- 
  @todos:
    - 目前 tags
-->

<template lang="pug">
.editor__footer
  .group(:class="{ 'inactive': isGroupEmpty }")
    .icon
      img(:src="groupIconSrc")
    span.no_exist(v-if="isGroupEmpty") 無
    span.group_name(v-else) {{ record.group?.name }}
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
import { ref, computed } from 'vue'
import { useEditorStore } from '@/store/editor'
import { useUserDataStore } from '@/store/userData'
import { storeToRefs } from 'pinia'

const editorStore = useEditorStore()
const userDataStore = useUserDataStore()
const { id: userId } = userDataStore

const { record } = storeToRefs(editorStore)

const tags = computed<string[]>(() => record.value.participants?.find(p => p.id == userId)?.tags || []) // 取得一個 tags 的參考，用以渲染畫面
const isTagsEmpty = computed(() => tags.value?.length === 0)
const tagIconSrc = computed(() => isTagsEmpty.value ? '/icons/tag_inactive.png' : '/icons/tag_active.png')
const isGroupEmpty = computed(() => record.value.group?.name.trim() == "" || !record.value.group)
const groupIconSrc = computed(() => isGroupEmpty.value ? '/icons/group_inactive.png' : '/icons/group_active.png')


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
  let userTags = record.value.participants?.find(p => p.id === userId)?.tags
  if (userTags) {
    userTags = userTags.filter(tag => tag.trim() !== '')
  }
}

// 直接去加入當下 user 的 tags
const addTag = () => {
  let userTags = record.value.participants?.find(p => p.id === userId)?.tags
  if (userTags) {
    userTags.push('')
  } else {
    userTags = ['']
  }
}

</script>

<style scoped lang="sass">
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

</style>