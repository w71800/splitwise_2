<template lang="pug">
  #loading
    .spinner
      img(src="/icons/spinner.png")
    .text Loading
      span.dots {{ dots }}
</template>

<script setup lang="ts">
const dotsNumber = ref(3)
let interval: NodeJS.Timeout

const dots = computed(() => {
  return '.'.repeat(dotsNumber.value)
})

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
@keyframes spin
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

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
  +block_size(80px)
  margin-bottom: 40px
  animation: spin 2s linear infinite
  img
    +block_size(100%)
    object-fit: contain

  
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
