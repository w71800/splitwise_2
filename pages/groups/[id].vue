<template lang="pug">
h1 這是群組 {{ id }}

</template>

<script setup lang="ts">
const { id } = useRoute().params
console.log(id);
</script>

<style scoped lang="sass">

</style>