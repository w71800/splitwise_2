<template lang="pug">
.editor__participants
  .participants-list(@click="toggleRecommendList")
    .label 和：
    .participants-item(v-for="participant in record.participants" :key="participant.id") 
      .avatar
        img(:src="participant.avatar")
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
        img(:src="participant.avatar")
      span {{ participant.displayName }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fakeFriends } from '@/data'
import type { Participant } from '@/types/types'
import { useEditorStore } from '@/store/editor'

const editorStore = useEditorStore()

const { record } = storeToRefs(editorStore)
const isRecommendListActive = ref(false)
const recommendParticipants = ref(fakeFriends)
const chosenParticipants = ref<Participant[]>([])


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

watch(() => record.value, (newRecord) => {
  console.log(newRecord)
})
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
  .participants-item
    align-items: center
    display: flex
    justify-content: space-between
    gap: 8px
    margin-right: 8px
    border: 1px solid #929292
    border-radius: 24px
    padding: 6px 10px 6px 8px
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