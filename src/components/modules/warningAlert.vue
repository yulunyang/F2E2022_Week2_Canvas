<template>
  <div class="chackLeaving w-full h-screen left-0 top-0 z-50 fixed" @click="closeWarning">
    <div class="loading-text absolute text-xl">
      <div class="max-w-2xl rounded-xl overflow-hidden shadow-lg bg-white w-full">
        <div class="px-12 py-6 flex flex-col justify-center">
          <div class="font-bold text-lg mb-8 whitespace-nowrap">{{ isWarningText }}</div>
            <button type="button" class="py-4 px-16 proj-bg-Gradient text-white rounded-xl proj-border-primary border-2 h-auto"
              @click="closeWarning">
              確定
            </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'

export default {
  components: {
  },
  props: {
    isWarningText: {
      type: String,
      default: '檔案超過10MB，請重新選擇'
    }
  },
  setup (props, ctx) {

    onMounted(() => {
      })
    onUnmounted(() => {
    })

    const closeWarning = () => {
      ctx.emit('closeWarning')
    }

    return {
      closeWarning
    }
  }
}
</script>

<style scoped lang="scss">
.chackLeaving {
  background: rgba(186, 186, 186, 0.47);
  backdrop-filter: blur(2.5px);
}
.loading-text {
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>
