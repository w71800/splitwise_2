<!-- 
  @todo 
  - 要動態取得使用者 id
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
    .navbar__add-button
      span +
</template>

<script setup lang="ts">
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
    path: `/account/${userId}`, 
    icon: {
      active: '/icons/profile.jpg',
      inactive: '/icons/profile.jpg'
    }
  },
]

const isActive = (pathString: string) => route.path === pathString
</script>

<style lang="sass" scoped>
.navbar
  position: fixed
  bottom: 0
  right: 0
  left: 0
  background-color: rgba(#fff, 0.8)
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
      flex-basis: 90px
      border: none
      cursor: default
    
    .text
      color: $color_text

    a 
      display: block
      position: absolute
      top: 0
      +block_size(100%)

.container
  display: flex
  align-items: flex-end

.navbar__add-button
  border-radius: 50%
  +block_size(120px)
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

.navbar__item.profile
  .img_wrapper
    border-radius: 50%
    overflow: hidden
</style>

