<!-- 
  @todo 
  - 要動態取得使用者 id
  - 用 margin 來做中間的分隔
  - 調整一下 CSS 的寫法
  - 在進入群組或朋友的子頁時，navbar 一樣要有 highlight 的效果
-->

<template lang="pug">
nav.navbar
  .container
    .navbar__item(
      v-for="item in navItems" 
      :key="item.path" 
      :class=`{ 
        'active': isActive(item.path),
        'navbar__item--spacer': item.spacer, 
        'profile': item.name === '帳戶'
      }`
    )
      template(v-if="!item.spacer")
        .img_wrapper
          img(
            :src="isActive(item.path) ? item.icon.active : item.icon.inactive" 
            :alt="item.name"
          )
        .text {{ item.name }}
        NuxtLink(:to="item.path")
    .navbar__add-button(@click="isEditorShowing = !isEditorShowing")
      span +
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

const isEditorShowing = inject('isEditorShowing') as Ref<boolean>
const route = useRoute()
const userId = 3 

const navItems = [
  { 
    name: '朋友', 
    path: '/friends', 
    icon: {
      active: '/icons/friend_active.png',
      inactive: '/icons/friend_inactive.png'
    }
  },
  { 
    name: '群組', 
    path: '/groups', 
    icon: {
      active: '/icons/group_active.png',
      inactive: '/icons/group_inactive.png'
    }
  },
  { spacer: true },
  { 
    name: '搜尋', 
    path: '/search', 
    icon: {
      active: '/icons/search_active.png',
      inactive: '/icons/search_inactive.png'
    }
  },
  { 
    name: '帳戶', 
    path: `/account`, 
    icon: {
      active: '/icons/profile.jpg',
      inactive: '/icons/profile.jpg'
    }
  },
]

const isActive = (pathString: string) => route.path.includes(pathString)

const handleAdd = () => {
  isEditorShowing.value = true
}
</script>

<style lang="sass" scoped>
.navbar
  position: fixed
  bottom: 0
  right: 0
  left: 0
  background-color: rgba(#fff, 0.8)
  box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.1)
  // +debug()

  &__item
    text-align: center
    flex: 1
    padding-top: 10px
    // border-top: 1px solid #888
    // border-right: 1px solid #888
    cursor: pointer

    &:first-child
      border-left: 1px solid #888

    &--spacer
      flex: 0
      flex-basis: 100px
      border: none
      cursor: default
    
    .text
      color: $color_text

    a 
      display: block
      position: absolute
      top: 0
      +block_size(100%)

.navbar__item.profile
  .img_wrapper
    border-radius: 50%
    overflow: hidden
    border: 2px solid rgba(#999, 0.5)

.container
  display: flex
  align-items: flex-end

.navbar__add-button
  border-radius: 50%
  +block_size(100px)
  position: absolute
  left: 50%
  transform: translate(-50%, 25%)
  background-color: $color_primary
  font-size: 6rem
  color: #fff
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5)

  span
    transform: translateY(-11%)
  
.img_wrapper
  +block_size(28px)
  position: relative
  left: 50%
  transform: translateX(-50%)
  align-content: center
  margin-bottom: 5px

  img
    +block_size(100%)
    object-fit: cover

.navbar__item.active
  .text
    color: $color_primary
    font-weight: $font_weight_bold
  &::before
    content: ''
    display: block
    width: 100%
    height: 6px
    background-color: $color_primary
    position: absolute
    top: -1px
    left: 0
    border-radius: 0 0 2px 2px
  &.profile
    .img_wrapper
      border: 2px solid $color_primary
</style>

