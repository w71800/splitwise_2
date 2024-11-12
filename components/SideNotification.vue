<template lang="pug">
.side-notification(
  :class="{ showing: isShowing, success: config.style === 'success', error: config.style === 'error' }"
  :style="{ '--theme-color': config.color }"
  )
  .content
    .icon
      img(:src="config.icon")
    .text {{ config.text }}
  .progress
    .bar
</template>

<script setup lang="ts">
import { computed, inject  } from 'vue'

const isSuccess = inject<Ref<boolean>>('isProcessSuccess')
const isShowing = inject<Ref<boolean>>('isNotificationShowing')

const config = computed(() => {
  return {
    text: isSuccess!.value ? '處理成功！' : '處理失敗！',
    style: isSuccess!.value ? 'success' : 'error',
    icon: isSuccess!.value ? '/notification/success.png' : '/notification/error.png',
    color: isSuccess!.value ? '#35b78d' : '#ff5216'
  }
})

</script>

<style scoped lang="sass">
@keyframes start
  0%
    width: 101%
  100%
    width: 0

@keyframes fadeinout
  0%
    opacity: 0
    transform: translateY(20px)
  20%
    opacity: 1
    transform: translateY(0px)
  50%
    opacity: 1
    transform: translateY(0px)
  80%
    opacity: 1
    transform: translateY(0px)
  100%
    opacity: 0
    transform: translateY(20px)

.side-notification
  position: absolute
  top: 54px
  right: 0px
  background-color: #fff
  border: 2px solid #D5D5D5
  border-radius: 6px
  overflow: hidden
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
  opacity: 0
  transform: translateY(20px)
  z-index: 999

.content
  display: flex
  align-items: center
  justify-content: center
  gap: 15px
  padding: 10px 15px

  
.text
  font-size: 1.1rem
  font-weight: $font-weight-bold
  color: var(--theme-color)
  top: 1px // 視覺微調


.icon
  +block_size(30px)
  border-radius: 50%
  display: flex
  align-items: center
  justify-content: center
  background-color: var(--theme-color)
  img
    +block_size(60%)
    object-fit: contain


.bar
  height: 6px
  width: 101%
  background-color: var(--theme-color)

  
.progress.start
  animation: start 2s linear forwards


.success
  .icon
    img
      transform: translateY(2px)


.side-notification.showing
  animation: fadeinout 2.5s cubic-bezier(0.36, 0, 0.76, 1.39) forwards
  .progress
    animation: start 1.4s linear forwards
    animation-delay: .5s
</style>
