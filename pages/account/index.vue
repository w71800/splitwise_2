<template lang="pug">
div
  h1 您好，{{ displayName }}
  p {{ email }}
  img(:src="avatar")
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/store/userData'

const { id, displayName, email, avatar } = useUserDataStore()


</script>

<style scoped>

</style>