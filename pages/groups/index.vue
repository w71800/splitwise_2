<template lang="pug">
.groups
  ListItem(
    v-for="group in groups" 
    :key="group.id" 
    :id="group.id" 
    :avatar="displayAvatar(group)" 
    :name="group.name"
  )
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/store/userData'
import { storeToRefs } from 'pinia'

const userDataStore = useUserDataStore()
const { groups } = storeToRefs(userDataStore)
const displayAvatar = (group) => group.avatar ?? '/avatars/default.png'

</script>

<style scoped lang="sass">

</style>