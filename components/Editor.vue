<!-- 
  @todo: 
  - 目前都是做空的新增資料，但要能夠接到在如果要編輯某個紀錄時的整包資料，且在編輯時，topbar 要為「編輯紀錄」
  - 要接測試資料進來
-->

<template lang="pug">
.editor(v-if="editorStore.isInitialized" :class="{ 'showing': isEditorShowing }" :style="{ height: editorHeight }")
  //- container 不動，改變的是 contents 的位置
  //- todo: 但想要把滾動的結構改成 container
  .scroll-container 
    .scroll-contents(:class="{ 'scrolled': isEditorScrolled }")
      EditorLeft
      EditorRight
</template>


<script setup lang="ts">
import { ref, inject, provide, reactive } from 'vue'
import type { Record } from '@/types/types'
import { fakeUser, fakeFriends } from '@/data'
import { useEditorStore } from '@/store/editor'

const editorStore = useEditorStore()

const isEditorShowing = inject('isEditorShowing') as Ref<boolean>
const isEditorScrolled = ref(false)
const editorHeight = ref('100vh')

const recordData = reactive<Record>({
  id: '1',
  title: '晚餐',
  value: 1200,
  currency: 'TWD',
  fullDate: new Date('2024-03-15'),
  participants: [fakeUser, fakeFriends[0]],
  payers: {
    id: "1",
    displayName: '威利',
    email: 'william@gmail.com',
    avatar: '/avatars/profile.jpg',
    paid: 1200
  },
  divisions: [],
  splitor: 'equal',
  group: {
    id: 'g1',
    name: '測試群組',
    members: [fakeUser, ...fakeFriends]
  }
})

provide('isEditorScrolled', isEditorScrolled)




// const fakeRecord = computed<Record>(() => ({
//   ...recordData,
//   divisions: recordData.participants.map(participant => ({
//     id: participant.id,
//     displayName: participant.displayName,
//     value: recordData.value / recordData.participants.length
//   })),
//   payers: {
//     id: recordData.payers.id,
//     displayName: recordData.payers.displayName,
//     paid: recordData.value
//   }
// }))

const scrollHandler = () => {
  isEditorScrolled.value = !isEditorScrolled.value
}

const setEditorHeight = () => {
  const vh = window.innerHeight * 0.01
  editorHeight.value = `${vh * 100}px`
}

onMounted(() => {
  setEditorHeight()
  window.addEventListener('resize', setEditorHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', setEditorHeight)
})
</script>


<style scoped lang="sass">
.editor
  position: fixed
  left: 0
  right: 0
  top: 0
  background-color: #fff
  z-index: 100
.scroll-container
  height: 100%
.scroll-contents
  width: 200vw
  height: 100%
  display: flex


.editor
  transition: transform 0.3s ease-in-out
  transform: translateY(100%)
  &.showing
    transform: translateY(0)
.scroll-contents
  transition: left 0.3s ease-in-out
  left: 0%
  &.scrolled
    left: -100%
</style>
