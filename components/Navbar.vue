<template lang="pug">
nav.navbar
  .container
    .navbar__item
      .img_wrapper
        img(src="/equal.png")
      a(href="/") 朋友
    .navbar__item(:class="{ active: true }")
      .img_wrapper
        img(src="/equal.png")
      a(href="/") 群組
    .navbar__item
    .navbar__item
      .img_wrapper
        img(src="/equal.png")
      a(href="/") 搜尋
    .navbar__item
      .img_wrapper
        img(src="/equal.png")
      a(href="/") 帳戶
    .add 
      span +
</template>

<script>
export default {
  name: 'Navbar',
  mounted() {
    console.log(this.$route.path)
  }
}
</script>

<style lang="sass" scoped>
.navbar
  *
    // border: 1px solid #000
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
  &__item:nth-child(3)
    flex: 0
    flex-basis: 100px
  &__item:nth-child(1)
    border-left: 1px solid #888

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
  & span
    transform: translateY(-11%)
  
.img_wrapper
  +block_size(30px)
  position: relative
  left: 50%
  transform: translateX(-50%)
  img
    +block_size(100%)
    object-fit: cover

.navbar__item.active
  &::before
    content: ''
    display: block
    width: 100%
    height: 3px
    background-color: $color_primary
    position: absolute
    top: -1px
    left: 0
</style>

