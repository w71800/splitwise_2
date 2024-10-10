<!-- 
  @todo 
  - 將 friends 和 groups 的頁面合併為一個共用的 layout
-->

<template lang="pug">
.layout
  Topbar(v-if="isTopbarActive")
  Navbar
  //- Editor
  //- 加入要插在 NuxtPage 中的頁面
  NuxtPage 
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()

const isTopbarActive = ref(checkTopbarActive(route.path))

function checkTopbarActive(path: string): boolean {
  return path.split('/').length > 1 && ( path.includes('/groups') || path.includes('/friends') || path.includes('/records') )
}

watch(() => route.path, (toPath) => {
  isTopbarActive.value = checkTopbarActive(toPath)
})
</script>