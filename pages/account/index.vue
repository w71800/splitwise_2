<template lang="pug">
.page
  h1 您好，{{ displayName }}
  .img__wrapper
    img(:src="avatar")
  p {{ email }}
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/store/userData'

const { id, displayName, email, avatar } = useUserDataStore()


</script>

<style scoped lang="sass">
h1
  text-align: center
  margin-bottom: 20px

.img__wrapper
  +block_size(100px)
  border-radius: 50%
  overflow: hidden
  border: 6px solid $color-primary
  margin: 0 auto
  margin-bottom: 20px
  & img
    +block_size(100%)
    object-fit: cover
p
  text-align: center
  color: $color-text
</style>