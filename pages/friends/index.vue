<template lang="pug">
.friends
  ListItem(
    v-for="friend in friends"
    :key="friend?.id"
    :id="friend?.id"
    :name="friend?.displayName"
    :avatar="displayAvatar(friend)"
  )
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/store/userData'
import { storeToRefs } from 'pinia'

const userDataStore = useUserDataStore()
const { friends } = storeToRefs(userDataStore)
const displayAvatar = (friend) => friend.avatar ?? '/avatars/default.png'
</script>

<style scoped lang="sass">

</style>