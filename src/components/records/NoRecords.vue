<template>
  <HeaderSection :step="-1" :isLoading="false" @backStepFirst="backStepFirst" />
  <div class="loading w-full h-screen left-0 top-0">
    <div class="loading-text absolute text-xl">
      <img src="@/assets/img/loading.png" class="car object-contain mx-auto mb-4" />
      <p class="typing-loading">尚無任何記錄</p>
    </div>
  </div>
</template>

<script>import HeaderSection from '@/components/modules/headerSection.vue'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  components: {
    HeaderSection
  },
  setup () {
    const router = useRouter()
    onMounted(() => {
      })
    onUnmounted(() => {
    })

    const backStepFirst = () => {
      router.push({ name: 'home'})
    }

    return {
      backStepFirst
    }
  }
}
</script>

<style scoped lang="scss">
.loading {
  background-image: url('@/assets/img/leaf1.png'), url('@/assets/img/leaf2.png');
  background-position: left bottom, right top;
  background-repeat: no-repeat;
  .loading-text {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
