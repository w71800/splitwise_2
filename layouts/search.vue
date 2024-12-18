<template lang="pug">
.layout
  SearchInput(
    v-model:activeTags="activeTags"
    :class="{ 'box-shadow': isPageScrolled }"
    v-model:searchText="searchText"
  )
  Navbar
  Editor
  main.search
    NuxtPage
</template>
  
<script setup lang="ts">
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'

const activeTags = ref<string[]>([]) // 接收到 searchInput 的 activeTags 變化後被賦值
const isPageScrolled = ref(false)
const pageRef = ref<HTMLElement | null>(null)
const searchText = ref<string>('')

provide('activeTags', activeTags) // 丟出 activeTags 給 search 的 index.vue 使用
provide('searchText', searchText) // 丟出 searchText 給 search 的 index.vue 使用

const handleScroll = () => {
  isPageScrolled.value = window.scrollY > 0 ? true : false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
