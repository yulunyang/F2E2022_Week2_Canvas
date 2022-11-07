<template>
  <div class="loading w-full h-screen fixed left-0 top-0 bg-white">
    <div class="loading-text absolute text-xl">
      <!-- <p class="typing-loading mb-6">上傳中...</p> -->
      <img src="@/assets/img/pen.png" class="car object-contain mx-auto" />
      <p class="typing-loading">上傳中...</p>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
export default {
  setup () {
    onMounted(() => {
      })
    onUnmounted(() => {
    })

    return {
    }
  }
}
</script>

<style scoped lang="scss">
.loading {
  background-image: url('@/assets/img/leaf1.png'), url('@/assets/img/leaf2.png');
  background-position: left bottom, right top;
  background-repeat: no-repeat;
}
</style>
