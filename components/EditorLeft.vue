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
  .editor__footer
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


</script>

<style lang="sass" scoped>
// todo: 調整 topbar 的樣式，這樣太醜了
.topbar
  position: absolute
  top: -44px
  left: 0
  right: 0
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


.recommend-participants
  &.active
    height: auto
</style>
