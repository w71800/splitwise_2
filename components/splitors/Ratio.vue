<template lang="pug">
#splitor
  .splitor__content
    .participants
      .participant(v-for="i in 10" :key="i")
        .avatar
          img(:src="'/avatars/profile.jpg'")
        .name 威利
          .value-hinter $30
        .input_wrapper
          input(type='number' name='participant' placeholder='1')
          label(for="participant") 份
  .splitor__hinter
    .title 分擔人數 1 人，共 
      span.settled 1 
      span 份
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.value-hinter
  position: absolute
  bottom: 0
  transform: translateY(100%)
  font-size: 12px
  color: #D5D5D5
  font-weight: $font-weight-regular

.splitor__hinter
  padding: 20px 0
  .title
    margin-bottom: 0
    span:nth-child(1)
      font-weight: $font-weight-bold
      color: $color_secondary
      &.settled
        color: $color_primary
</style>