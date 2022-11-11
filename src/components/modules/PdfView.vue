<!-- eslint-disable vue/require-prop-type-constructor -->
<template>
  <div>
    <button id="prev">Previous</button>
    <button id="next">Next</button>
    <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
  </div>
  <canvas id="the-canvas" class="w-full"></canvas>
</template>

<script>
export default({
  components: {
  },
  props: {
  },
  setup () {
    return {}
  },
})
</script>

<style lang="scss" scoped>
</style>
