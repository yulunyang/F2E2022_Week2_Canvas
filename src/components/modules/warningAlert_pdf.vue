<template>
  <div class="warningAlert_pdf w-full h-screen left-0 top-0 fixed" @click="closeWarning">
    <div class="loading-text absolute text-xl">
      <div class="max-w-2xl rounded-3xl overflow-hidden shadow-lg bg-white w-full">
        <div class="px-12 py-6 flex flex-col justify-center">
          <div class="font-bold text-lg mb-8 whitespace-nowrap">{{ isWarningText }}</div>
            <button type="button" class="py-4 px-16 proj-bg-Gradient text-white rounded-3xl proj-border-primary border-2 h-auto"
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
  name: 'warningAlert_pdf',
  components: {
  },
  props: {
    isWarningText: {
      type: String,
      default: '請置入簽名後再完成簽署'
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
.warningAlert_pdf {
  background: rgba(186, 186, 186, 0.47);
  backdrop-filter: blur(2.5px);
  z-index: 10;
}
.loading-text {
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>
