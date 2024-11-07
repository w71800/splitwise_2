<template lang="pug">
.friends
  ListItem(
    v-for="friend in userDataStore.friends"
    :key="friend?.id"
    :name="friend?.displayName"
    :avatar="friend?.avatar"
  )
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/store/userData'

const userDataStore = useUserDataStore()

</script>

<style scoped lang="sass">

</style>