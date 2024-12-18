<!-- 
  @todo:
  - 每個人專屬的標籤，所以在 Record 的參與者中，要存放各自的標籤值
-->

<template lang="pug">
.search-input
  input(
    type="text"
    placeholder="搜尋"
    v-model="searchTextModel"
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
import { useRecordsStore } from '@/store/records'
import { useUserDataStore } from '@/store/userData';
import { getTags } from '@/utils/utils';

interface Tag {
  name: string
  isActive: boolean
}

const searchTextModel = defineModel<string>('searchText')
const activeTagsModel = defineModel<string[]>('activeTags')

const { records } = useRecordsStore()
const { id: userId } = useUserDataStore()

const tags = ref<Tag[]>(getTags(records, userId).map( tag => ({ name: tag, isActive: false })))

const toggleTag = (tag: Tag) => {
  tag.isActive = !tag.isActive
  activeTagsModel.value = tags.value.filter(tag => tag.isActive).map(tag => tag.name)
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
  z-index: 2
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

.search-input.box-shadow
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1)
</style>
