<template lang="pug">
h1 這是朋友 {{ id }}
</template>

<script setup lang="ts">
/**
 * @todo
 * - 這邊內容能否抓一次之後快取？
 * - 
 */
const { id } = useRoute().params
const records = await getRecords('friends', id as string)
</script>

<style scoped lang="sass">

</style>