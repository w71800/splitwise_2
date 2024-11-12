<!-- 
  @todo:
  - 每個人專屬的標籤，所以在 Record 的參與者中，要存放各自的標籤值
-->

<template lang="pug">
.search-input
  input(
    type="text"
    placeholder="搜尋"
  )
  .tags
    .tags__hint 標籤：
    .tags__wrapper
      .tag(
        v-for="tag in tags"
        :key="tag.name"
        :class="{ active: tag.isActive }"
        @click="toggleTag(tag)"
      ) {{ tag.name }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRecordsStore } from '@/store/records'
import { getTags } from '@/utils/utils';

const { records } = useRecordsStore()

interface Tag {
  name: string
  isActive: boolean
}

const emit = defineEmits(['update:activeTags'])

const tags = ref<Tag[]>(getTags(records).map( tag => ({ name: tag, isActive: false })))
const activeTags = computed(() => tags.value.filter(tag => tag.isActive).map(tag => tag.name))

const toggleTag = (tag: Tag) => {
  tag.isActive = !tag.isActive
  emit('update:activeTags', activeTags.value)
}
</script>

<style scoped lang="sass">
.search-input
  width: 100vw
  position: sticky
  top: 0
  background-color: $color_primary
  padding: 10px 0px
  padding-top: 15px
  z-index: 250
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
    text-align: left
    &::placeholder
      text-align: left
  .tags
    padding-left: 20px
    display: flex
  .tags__hint
    color: rgba(#fff, .9)
    display: inline-block
    font-weight: $font_weight_medium
    font-size: .8rem
    margin-right: 10px
    text-align: center
    align-content: center
    flex-shrink: 0
  
  .tags__wrapper
    display: flex
    flex-wrap: wrap
    margin-bottom: -10px // 抵消最後一行的底部邊距
    
  .tag
    opacity: 0.8
    cursor: pointer
    color: $color_primary
    font-weight: $font_weight_medium
    font-size: .7rem
    background-color: #fff
    padding: 3px 7px
    border-radius: 5px
    margin-right: 10px
    margin-bottom: 10px // 增加底部邊距
    &.active
      opacity: 1
      background-color: $color_secondary
      color: #fff
</style>