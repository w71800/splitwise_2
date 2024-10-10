<!-- 
  @todo:
  - 如何將這個地方也吃到一些 Editor 中的共用樣式？
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
  .recommend-participants
    .recommend-item(v-for="participant in recommendParticipants" :key="participant.id") {{ participant.displayName }}
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Participant } from '@/types/types'

const isEditorShowing = inject('isEditorShowing')

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

// 假資料：推薦的參與者
const recommendParticipants = ref<Participant[]>([
  {
    id: '3',
    displayName: '王五',
    avatar: '/avatars/profile.jpg'
  },
  {
    id: '4',
    displayName: '趙六',
    email: 'zhaoliu@example.com',
    avatar: '/avatars/profile.jpg'
  },
  {
    id: '5',
    displayName: '孫七',
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
    icon: '/icons/save.png',
    method: 'submit'
  }
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
</style>