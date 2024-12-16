<template lang="pug">
.styled-button(:style="{ '--theme-color': computedBackgroundColor }")
  slot
</template>

<script setup lang="ts">
const props = defineProps<{
  themeColor: string
}>()

const computedBackgroundColor = computed(() => {
  switch (props.themeColor) {
    case 'primary':
      return "#35b78d"
    case 'secondary':
      return "#ff5216"
    default:
      return props.themeColor
  }
})
</script>

<style scoped lang="sass">
.styled-button
  width: fit-content
  padding: 6px 12px
  border-radius: 6px
  color: white
  cursor: pointer
  background-color: var(--theme-color)
  // box-shadow: 0 3px 0px 0 darken(var(--theme-color), 13%)
  transition: all 0.2s ease
  &:active
    box-shadow: none
    transform: translateY(3px)

</style>