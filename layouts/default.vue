<template lang="pug">
.layout
  Header(:title="pageTitle")
  Navbar
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageTitle = ref('家裡事項')
</script>