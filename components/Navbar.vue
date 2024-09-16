/**
 * @todo: 
 * 1. 要動態取得使用者 id
 */

<template lang="pug">
nav.navbar
  .container
    .navbar__item(
      v-for="item in navItems" 
      :key="item.path" 
      :class="{ 'active': isActive(item.path), 'navbar__item--spacer': item.spacer }"
    )
      template(v-if="!item.spacer")
        .img_wrapper
          //- img(:src="item.icon" :alt="item.name")
        NuxtLink(:to="item.path") {{ item.name }}
    .add 
      span +
</template>

<script setup lang="ts">
const route = useRoute()
const userId = 3 

const navItems = [
  { name: '朋友', path: '/friends', icon: '/icons/friends.png' },
  { name: '群組', path: '/groups', icon: '/icons/groups.png' },
  { spacer: true },
  { name: '搜尋', path: '/search', icon: '/icons/search.png' },
  { name: '帳戶', path: `/account/${userId}`, icon: '/icons/account.png' },
]

const isActive = (pathString: string) => route.path === pathString
</script>

<style lang="sass" scoped>
.navbar
  position: fixed
  bottom: 0
  right: 0
  left: 0

  &__item
    text-align: center
    flex: 1
    padding-top: 10px
    border-top: 1px solid #888
    border-right: 1px solid #888
    cursor: pointer

    &:first-child
      border-left: 1px solid #888

    &--spacer
      flex: 0
      flex-basis: 100px
      border: none
      cursor: default

.container
  display: flex
  align-items: flex-end

.add
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
  +block_size(30px)
  position: relative
  left: 50%
  transform: translateX(-50%)

  img
    +block_size(100%)
    object-fit: cover

.navbar__item.active::before
  content: ''
  display: block
  width: 100%
  height: 3px
  background-color: $color_primary
  position: absolute
  top: -1px
  left: 0
</style>

