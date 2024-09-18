<template lang="pug">
.search-input
  input(type="text" placeholder="搜尋")
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.search-input
  position: absolute
  background-color: $color_primary
  bottom: 0
  left: 0
  right: 0
  transform: translateY(100%)
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
    padding: 0 15px
</style>