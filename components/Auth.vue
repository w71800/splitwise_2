<template lang="pug">
  form(@submit.prevent="handleSubmit")

</template>

<script setup lang="ts">
const isSignup = ref(false) // 如果是註冊的話，會額外多一個暱稱欄位

</script>

<style scoped lang="sass">

</style>