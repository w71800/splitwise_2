<template lang="pug">
  #loading
    .spinner(:style="{ '--spinner-scale': props.spinnerScale }")
      .spinner-dots(v-for="i in props.spinnerScale" :style="{ '--index': i-1 }")
    .text Loading
      span.dots {{ dots }}
</template>

<script setup lang="ts">
let interval: NodeJS.Timeout
const props = defineProps<{
  spinnerScale: number
}>()

const dotsNumber = ref(3)

const dots = computed(() => '.'.repeat(dotsNumber.value))


onMounted(() => {
  interval = setInterval(() => {
    dotsNumber.value = dotsNumber.value === 3 ? 0 : dotsNumber.value + 1
  }, 500)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped lang="sass">
@keyframes pulse
  $origin-scale: .8
  0%
    transform: scale($origin-scale)
  50%
    transform: scale(1.2)
  100%
    transform: scale($origin-scale)

#loading
  +block_size(100vw, 100vh)
  background-color: rgba(#D5D5D5, 0.2)
  z-index: 999
  position: fixed
  top: 0
  left: 0
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  backdrop-filter: blur(8px)
  -webkit-backdrop-filter: blur(8px)


.spinner, .text
  text-align: center
  // +debug()


.spinner
  --spinner-size: 100px
  +block_size(var(--spinner-size))
  margin-bottom: 40px
  display: flex
  justify-content: flex-start
  align-items: center
  img
    +block_size(100%)
    object-fit: contain
  .spinner-dots
    --dot-size: 15px
    position: absolute
    // 旋轉的 transform 套用在外層元素
    transform-origin: calc(var(--spinner-size) / 2) calc(var(--dot-size) / 2)
    transform: rotate(calc(360deg * var(--index) / var(--spinner-scale)))
    &::after
      content: ''
      position: absolute
      +block_size(var(--dot-size))
      background-color: $color-primary
      border-radius: 50%
      transform-origin: center
      animation: pulse 1.3s infinite
      animation-delay: calc(var(--index) * 0.5s)
  

  
.text
  color: $color-primary
  font-size: 2rem
  font-weight: $font-weight-bold
  span.dots
    position: absolute
    right: -5px
    transform: translateX(100%)
    letter-spacing: 2px
</style>
