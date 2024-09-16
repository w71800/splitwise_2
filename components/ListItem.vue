<template lang="pug">
.list-item
  nuxt-link(:to="`/friends/${id}`")
    .list-item__icon
      img(:src="avatar")
    .list-item__title
      h3 {{ title }}
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string | number
  avatar: string
  name: string
}>()

const { id, avatar, name: title } = props
</script>

<style lang="sass" scoped>
.list-item
  padding: 10px
  border-bottom: 1px solid #e0e0e0
  color: $color_text
  & a
    width: 100%
    display: flex
    align-items: center
  &__icon
    width: 40px
    height: 40px
    border-radius: 50%
    overflow: hidden
    margin-right: 20px
    img
      width: 100%
      height: 100%
      object-fit: cover
</style>