<template lang="pug">
header.header
  .container
    h1.header__title {{ title }}
    .header__info
</template>
  
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style lang="sass" scoped>
.header
  padding: 0 16px
  .container
    border-bottom: 1px solid #888
</style>