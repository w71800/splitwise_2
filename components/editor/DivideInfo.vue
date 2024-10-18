<template lang="pug">
.divide_info(@click="isEditorScrolled = !isEditorScrolled")
  span 先由
  span.highlight {{ payers?.displayName }}
  span 支付
  br
  span.highlight {{ splitorText }}
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>