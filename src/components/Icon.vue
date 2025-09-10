<template>
  <i :class="name"></i>
</template>

<script>
export default {
  name: 'NavIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
/* Ensure icons have a consistent width and are centered */
i {
  width: 1.25em;
  text-align: center;
}
</style>
