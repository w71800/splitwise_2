<template lang="pug">
.friends
  ListItem(
    v-for="friend in friends" 
    :key="friend.id" :id="friend.id" 
    :avatar="friend.avatar" 
    :name="friend.displayName"
  )
</template>

<script setup lang="ts">
import { useFriendsStore } from '@/store/friends'

const friendsStore = useFriendsStore()
const friends = friendsStore.friends
</script>

<style scoped lang="sass">

</style>