<template>
  <div class="loading w-full h-screen left-0 top-0 z-50">
    <!-- <div class="py-4 px-6 md:px-28 lg:px-8">
      <img src="@/assets/img/logo.png" alt="" class="object-contain block">
    </div> -->
    <div class="loading-text absolute text-xl">
      <Vue3Lottie id="loading_pen" :animationData="animationData" class="h-auto" :width="150" />
      <!-- <p class="typing-loading text-center font-semibold">上傳中...</p> -->
      <p class="typing-loading text-center font-semibold">簽名優化中......</p>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import animationData from '@/assets/img/json/loading.json'
export default {
  components: {
    Vue3Lottie
  },
  setup () {

    onMounted(() => {
      })
    onUnmounted(() => {
    })

    return {
      animationData
    }
  }
}
</script>

<style scoped lang="scss">
.loading {
  // background-image: url('@/assets/img/leaf1.png'), url('@/assets/img/leaf2.png');
  // background-position: left bottom, right top;
  // background-repeat: no-repeat;
  background-color: rgb(255, 255, 255, 1);
}
.loading-text {
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>
