<template lang="pug">
.friends
  ListItem(
    v-for="friend in friends"
    :key="friend?.id"
    :name="friend?.displayName"
    :avatar="friend?.avatar"
  )
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/store/userData'
import { storeToRefs } from 'pinia'

const userDataStore = useUserDataStore()
const { friends } = storeToRefs(userDataStore)
</script>

<style scoped lang="sass">

</style>