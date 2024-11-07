<template lang="pug">
.groups
  ListItem(
    v-for="group in groups" 
    :key="group.id" 
    :id="group.id" 
    :avatar="group.avatar" 
    :name="group.name"
  )
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/store/userData'
import { storeToRefs } from 'pinia'

const userDataStore = useUserDataStore()
const { groups } = storeToRefs(userDataStore)


</script>

<style scoped lang="sass">

</style>