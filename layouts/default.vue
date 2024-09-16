<template lang="pug">
.layout
  Topbar
  Navbar
  //- 加入要插在 NuxtPage 中的頁面
  NuxtPage 
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageTitle = ref('家裡事項')
</script>