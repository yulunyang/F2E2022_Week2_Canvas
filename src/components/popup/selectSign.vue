<template>
  <div class="warningAlert_pdf w-full h-screen left-0 top-0 fixed">
    <div class="loading-text absolute text-xl max-w-md w-full">
      <div class="bg rounded-3xl overflow-hidden shadow-lg w-full">
        <div class="px-4 py-6 flex flex-col justify-center w-full">
          <div class="font-bold text-lg mb-8 whitespace-nowrap text-center proj-text-primary">請選擇簽名</div>
          <div class="flex items-center">
            <div class="h-auto bg-white w-4/5 rounded-3xl" @click="selectedSign(url)">
              <img :src="url" class='sign mx-auto object-contain w-36' />
            </div>
            <a class="p-2 w-1/5 inline-flex justify-center items-center" @click="delecteSign(url)">
              <img src="@/assets/img/delete.png" alt="">
            </a>
          </div>
            <!-- <button type="button" class="py-4 px-16 proj-bg-Gradient text-white rounded-3xl proj-border-primary border-2 h-auto"
              @click="closeWarning">
              確定
            </button> -->

            <a href="" class="proj-text-primary block mt-4 font-bold text-lg whitespace-nowrap">+ 新增簽名</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'

export default {
  name: 'warningAlert_pdf',
  components: {
  },
  props: {
  },
  setup (props, ctx) {

    const url = ref('')

    onMounted(() => {
      if (localStorage.getItem('vue-canvas')) {
        url.value = localStorage.getItem('vue-canvas')
      }
      })
    onUnmounted(() => {
    })

    const closeWarning = () => {
      ctx.emit('closeWarning')
    }
    const selectedSign = (url) => {
      ctx.emit('selectedSign', url)
      closeWarning()
      // console.log(url)
    }
    const delecteSign = (url) => {
      console.log(url)
    }
    return {
      url,
      closeWarning,
      selectedSign,
      delecteSign
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
.bg {
  background: #F0F0F0;
}
</style>
