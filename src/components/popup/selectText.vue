<template>
  <div class="warningAlert_pdf w-full h-screen left-0 top-0 fixed">
    <div class="select_bg absolute h-screen w-screen left-0 top-0" @click="closeWarning"></div>
    <div class="loading-text absolute text-xl max-w-md w-full">
      <div class="bg rounded-3xl overflow-hidden shadow-lg w-full">
        <div class="px-4 py-6 flex flex-col justify-center w-full">
          <div class="mb-6">
            <textarea class="w-full h-36 rounded-3xl p-3" v-model="text" />
          </div>
          <div class="flex">
            <button type="button" class="py-4 px-16 proj-text-primary text-white rounded-3xl proj-border-primary border-2 h-auto w-1/2 mx-1"
              @click="closeWarning">
              取消
            </button>
            <button type="button" class="py-4 px-16 proj-bg-Gradient text-white rounded-3xl proj-border-primary border-2 h-auto w-1/2 mx-1"
              @click="selectText()">
              確定
            </button>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'warningAlert_pdf',
  components: {
  },
  props: {
  },
  setup (props, ctx) {

    const text = ref('')


    const closeWarning = () => {
      ctx.emit('closeWarning')
    }

    const selectText = () => {
      ctx.emit('selectedText', text.value)
      closeWarning()
      // console.log(url)
    }

    return {
      closeWarning,
      selectText,
      text
    }
  }
}
</script>

<style scoped lang="scss">
.warningAlert_pdf {
  z-index: 10;
}
.select_bg {
  background: rgba(186, 186, 186, 0.47);
  backdrop-filter: blur(2.5px);
}
.loading-text {
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>
