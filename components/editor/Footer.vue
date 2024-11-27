<!-- 
  @todos:
    - 目前 tags
-->

<template lang="pug">
.editor__footer
  .recommend-groups(v-if="isGroupRecommendActive")
    .recommend-item(v-for="group in recommendGroups" :key="group.id" @click="setGroup(group)")
      .avatar
        img(:src="group.avatar")
      span {{ group.name }}
  .group(:class="{ 'inactive': isGroupEmpty }" @click="isGroupRecommendActive = !isGroupRecommendActive")
    .icon
      img(:src="groupIconSrc")
    .group_name {{ record.group?.name || '無' }}
  .tags(:class="{ 'inactive': isTagsEmpty }")
    .icon
      img(:src="tagIconSrc")
    .tag(v-for="(tag, index) in tags" :key="tag")
      label #
      input(
        type="text"
        @input="setAdjustWidth($event.target, index)"
        v-model="tags[index]"
        :style="{ width: tagWidths[index] + 'px' }"
        @blur="removeEmptyTag"
      )
    .add_tag(@click="addTag")
      .icon
        img(:src="'/icons/add.png'")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditorStore } from '@/store/editor'
import { useUserDataStore } from '@/store/userData'
import { storeToRefs } from 'pinia'
import { getComplement } from '@/utils/utils'
import type { Group } from '@/types/types'

const editorStore = useEditorStore()
const userDataStore = useUserDataStore()
const { id: userId, groups } = userDataStore

const { record } = storeToRefs(editorStore)
const isGroupRecommendActive = ref(false)
const measureSpan = ref<HTMLSpanElement | null>(null)
const tagWidths = ref<number[]>([])

const tags = computed<string[]>(() => record.value.participants?.find(p => p.id == userId)?.tags || []) // 取得一個 tags 的參考，用以渲染畫面
const isTagsEmpty = computed(() => tags.value?.length === 0)
const tagIconSrc = computed(() => isTagsEmpty.value ? '/icons/tag_inactive.png' : '/icons/tag_active.png')
const isGroupEmpty = computed(() => record.value.group?.name.trim() == "" || !record.value.group)
const groupIconSrc = computed(() => isGroupEmpty.value ? '/icons/group_inactive.png' : '/icons/group_active.png')
const recommendGroups = computed(() => {
  if (!record.value.group) return groups
  else return groups ? getComplement(groups, [ record.value.group ]) : []
}) 


const setAdjustWidth = async (el: HTMLInputElement, index: number) => {
  if (!measureSpan.value) return
  
  const styles = window.getComputedStyle(el)
  Object.assign(measureSpan.value.style, {
    font: styles.font,
    fontSize: styles.fontSize,
    fontFamily: styles.fontFamily,
    fontWeight: styles.fontWeight,
    letterSpacing: styles.letterSpacing
  })

  measureSpan.value.textContent = el.value || el.placeholder
  const textWidth = measureSpan.value.offsetWidth
  tagWidths.value[index] = textWidth + 10
}


const removeEmptyTag = () => {
  const participant = record.value.participants?.find(p => p.id === userId)
  if (participant && participant.tags) {
    participant.tags = participant.tags.filter(tag => tag.trim() !== '')
  }
}

const addTag = () => {
  let userTags = record.value.participants?.find(p => p.id === userId)?.tags
  if (userTags) {
    userTags.push('')
  } else {
    record.value.participants.find(p => p.id === userId)!.tags = ['']
  }
  tagWidths.value.push(20)
}


const setGroup = (group: Group): void => {
  record.value.group = group
  isGroupRecommendActive.value = false
}

onMounted(() => {
  const span = document.createElement('span')
  span.style.visibility = 'hidden'
  span.style.position = 'absolute'
  span.style.whiteSpace = 'pre'
  document.body.appendChild(span)
  measureSpan.value = span
})

onUnmounted(() => {
  if (measureSpan.value) {
    document.body.removeChild(measureSpan.value)
  }
})

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
  
  .group
    input
      width: 70px
  
  .tags
    input
      color: $color-primary
    .tag
      display: flex
      align-items: center
      margin-right: 10px
      label
        color: rgba($color-primary, 0.7)
        font-weight: $font-weight-bold
        font-size: 12px
      input
        padding-right: 0
        height: 20px
      .remove
        opacity: 0.5
        +block_size(8px)
        font-size: 0px
        cursor: pointer
        // left: -3px
        img
          +block_size(100%)
          object-fit: cover
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
    input
      &:focus
        border: 1px solid rgba(#929292, 0.3)
  .group.inactive
    color: rgba(#929292, 1)

.recommend-groups
  position: absolute
  left: 8px
  bottom: calc(100% + 10px)
  display: block
  border: 1px solid rgba(#929292, 0.3)
  .recommend-item
    cursor: pointer
    display: flex
    padding: 5px 8px
    padding-right: 100px
    gap: 8px
    border-bottom: 1px solid rgba(#929292, 0.3)
    color: #5E5E5E
  img
    +block_size(100%)
    object-fit: cover
  .avatar
    border-radius: 50%
    overflow: hidden
    +block_size(20px)
    border: 1px solid #000


</style>