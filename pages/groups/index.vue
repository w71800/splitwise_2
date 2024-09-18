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
import { ref } from 'vue'
import { useGroupsStore } from '@/store/groups'

const groupsStore = useGroupsStore()
const groups = ref(groupsStore.groups)


</script>

<style scoped lang="sass">

</style>