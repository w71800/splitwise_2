<template lang="pug">
.navigation-button
  .icon(v-if="option.type == 'icon'")
    img(:src="option.icon")
  .text(v-if="option.type == 'text'")
    span {{ option.text }}
</template>

<script setup lang="ts">
import type { Icon, Text } from '@/utils/topbarConfig'



defineProps<{
  option: Icon | Text
}>()
</script>

<style scoped lang="sass">
.navigation-button
  font-size: 0
  img
    +block-size(100%)
    object-fit: contain
  .text
    white-space: nowrap
    font-size: 1rem
    color: $color_primary

.left
  .text
    position: absolute
    left: 0
.right
  .text
    position: absolute
    right: 0
</style>
