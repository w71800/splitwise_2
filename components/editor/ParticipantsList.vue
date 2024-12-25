<template lang="pug">
.editor__participants
  .participants-list(@click="toggleRecommendList")
    .label 和：
    .participants-items
      .participants-item(v-for="participant in record.participants" :key="participant.id") 
        .avatar
          img(:src="participant.avatar ?? '/avatars/default.png'")
        .name {{ participant.displayName }}
        .remove(@click="removeParticipant(participant)")
          img(:src="'/icons/remove.png'")
  .recommend-participants(:class="{ 'active': isRecommendListActive }")
    .recommend-item(
      v-for="participant in recommendParticipants" 
      :key="participant.id" 
      @click="insertParticipant(participant)"
    ) 
      .avatar
        img(:src="participant.avatar ?? '/avatars/default.png'")
      span {{ participant.displayName }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Participant } from '@/types/types'
import { useEditorStore } from '@/store/editor'
import { getComplement as getComplementParticipants } from '@/utils/utils'
import { useUserDataStore } from '@/store/userData'

const userData = useUserDataStore().$state
const editorStore = useEditorStore()

const { record } = storeToRefs(editorStore)
const isRecommendListActive = ref(false)

const recommendParticipants = computed(() => getComplementParticipants([ ...userData.friends!, userData ], record.value.participants))

const insertParticipant = (participant: Participant) => {
  record.value.participants.push(participant)
}

const removeParticipant = (participant: Participant) => {
  record.value.participants = record.value.participants.filter(p => p.id !== participant.id)
}

const toggleRecommendList = () => {
  isRecommendListActive.value = !isRecommendListActive.value
  console.log(isRecommendListActive.value)
}
</script>

<style scoped lang="sass">

.avatar
  +block_size(32px)
  border-radius: 50%
  overflow: hidden
  img
    width: 100%
    height: 100%
    object-fit: cover

.editor__participants
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
    height: 34px
    align-content: center
  .participants-items
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 12px 10px
  .participants-item
    align-items: center
    display: flex
    justify-content: space-between
    gap: 8px
    border: 1px solid #929292
    border-radius: 24px
    padding: 6px 10px 6px 8px
    flex-shrink: 0
    .avatar
      +block_size(20px)
      border: 1px solid #000
    .name
      color: #929292
      font-size: .9rem
      margin-right: 5px
    .remove
      +block_size(10px)
      cursor: pointer
      opacity: 0.3
      font-size: 0
      img
        width: 100%
        height: 100%
        object-fit: cover
  
  // todo: 加上展開時的過渡效果，可能改用 grid 來實作？
  .recommend-participants
    max-height: 0
    opacity: 0
    position: absolute
    left: 0
    right: 0
    bottom: 0
    transform: translateY(100%)
    overflow: hidden
    transition: max-height .3s ease, opacity .3s ease
    background-color: #fff
    z-index: 20
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
    max-height: 999vh
    opacity: 1

</style>