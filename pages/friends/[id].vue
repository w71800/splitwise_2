<template lang="pug">
h1 這是朋友 {{ id }}
</template>

<script setup lang="ts">
const { id } = useRoute().params
</script>

<style scoped lang="sass">

</style>