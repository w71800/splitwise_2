<template lang="pug">
.search-input
  input(
    type="text"
    placeholder="搜尋"
  )
  .tags
    .tags__wrapper
      .tags__hint 標籤：
      .tag(
        v-for="tag in tags"
        :key="tag.name"
        :class="{ active: tag.isActive }"
        @click="toggleTag(tag)"
      ) {{ tag.name }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tag {
  name: string
  isActive: boolean
}

const tags = ref<Tag[]>([
  { name: '未結清', isActive: false },
  { name: '已結清', isActive: false },
  { name: '待整理', isActive: false }
])

const toggleTag = (tag: Tag) => {
  tag.isActive = !tag.isActive
}
</script>

<style scoped lang="sass">
.search-input
  position: fixed
  background-color: $color_primary
  top: 0
  left: 0
  right: 0
  padding: 10px 0px
  input
    display: block
    margin: 0 auto
    width: 90%
    height: 30px
    border-radius: 20px
    border: none
    outline: none
    background-color: #fff
    font-size: 1rem
    margin-bottom: 15px
    padding: 0 15px
  .tags
    padding-left: 20px
  .tags__hint
    color: rgba(#fff, .8)
    display: inline-block
    font-weight: $font_weight_medium
    font-size: .8rem
    margin-right: 10px
  .tag
    cursor: pointer
    color: $color_primary
    font-weight: $font_weight_medium
    font-size: .7rem
    display: inline-block
    background-color: #fff
    padding: 3px 7px
    border-radius: 7px
    margin-right: 10px
    &.active
      background-color: $color_secondary
      color: #fff
</style>