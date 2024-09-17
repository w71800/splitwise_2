<template lang="pug">
.friends
  ListItem(
    v-for="friend in fakeFriends" 
    :key="friend.id" :id="friend.id" 
    :avatar="friend.avatar" 
    :name="friend.name"
  )
</template>

<script setup lang="ts">
const fakeFriends = [
  {
    id: 1,
    name: '陳小明',
    avatar: '/avatars/profile.jpg'
  },
  {
    id: 2,
    name: '林美玲',
    avatar: '/avatars/profile.jpg'
  },
  {
    id: 3,
    name: '王大華',
    avatar: '/avatars/profile.jpg'
  }
]
</script>

<style scoped lang="sass">

</style>