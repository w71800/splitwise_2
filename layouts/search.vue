<template lang="pug">
.layout
  SearchInput(v-model:activeTags="activeTags")
  Navbar
  Editor
  main.search
    NuxtPage 
</template>
  
<script setup lang="ts">
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'

const activeTags = ref<string[]>([]) // 接收到 searchInput 的 activeTags 變化後被賦值

provide('activeTags', activeTags) // 丟出 activeTags 給 search 的 index.vue 使用
</script>
