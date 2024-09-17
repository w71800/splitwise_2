<template lang="pug">
.groups
  ListItem(
    v-for="group in fakeGroups" 
    :key="group.id" 
    :id="group.id" 
    :avatar="group.avatar" 
    :name="group.name"
  )
</template>

<script setup lang="ts">
const fakeGroups = [
  {
    id: 1,
    name: '家裡事項',
    avatar: '/avatars/profile.jpg'
  },
  {
    id: 2,
    name: '日本行',
    avatar: '/avatars/profile.jpg'
  },
  {
    id: 3,
    name: '朋友聚會',
    avatar: '/avatars/profile.jpg'
  }
]
</script>

<style scoped lang="sass">

</style>