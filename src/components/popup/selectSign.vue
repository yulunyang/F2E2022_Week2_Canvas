<template>
  <div class="warningAlert_pdf w-full h-screen left-0 top-0 fixed">
    <div class="select_bg absolute h-screen w-screen left-0 top-0" @click="closeWarning"></div>
    <div class="loading-text absolute text-xl max-w-md w-full z-50">
      <div class="bg rounded-3xl overflow-hidden shadow-lg w-full">
        <div class="px-4 py-6 flex flex-col justify-center w-full">
          <div class="font-bold text-lg mb-8 whitespace-nowrap text-center proj-text-primary">請選擇簽名</div>
          <div class="flex items-center mb-2" v-for="(item, idx) in signArr" :key="idx">
            <div class="h-auto bg-white w-4/5 rounded-3xl" @click="selectedSign(item)">
              <img :src="item" class='sign mx-auto object-contain w-36' />
            </div>
            <a class="p-2 w-1/5 inline-flex justify-center items-center" @click="delecteSign(idx)">
              <img src="@/assets/img/delete.png" alt="">
            </a>
          </div>
          <a href="" class="proj-text-primary block mt-4 font-bold text-lg whitespace-nowrap">+ 新增簽名</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'

export default {
  name: 'selectSign',
  components: {
  },
  props: {
  },
  setup (props, ctx) {

    // const url = ref('')
    const signArr = ref('')

    onMounted(() => {
      init()

    })
    onUnmounted(() => {
    })

    const init = () => {
      // if (localStorage.getItem('vue-canvas')) {
      //   url.value = localStorage.getItem('vue-canvas')
      // }
      if (localStorage.getItem('vue-canvas-array')) {
        signArr.value = JSON.parse(localStorage.getItem('vue-canvas-array'))
      }
    }

    const closeWarning = () => {
      ctx.emit('closeWarning')
    }

    const selectedSign = (url) => {
      ctx.emit('selectedSign', url)
      closeWarning()
      // console.log(url)
    }

    const delecteSign = (idx) => {
      console.log(idx)
      let arr = JSON.parse(localStorage.getItem('vue-canvas-array'))
      console.log(arr)
      if (arr.lngth > 1) {
        arr.splice(idx, 1)
        localStorage.setItem("vue-canvas-array", JSON.stringify(arr))
      } else {
        localStorage.removeItem('vue-canvas-array')
      }
      init()
    }
    return {
      // url,
      signArr,
      closeWarning,
      selectedSign,
      delecteSign,
      init
    }
  }
}
</script>

<style scoped lang="scss">
.warningAlert_pdf {
  // background: rgba(186, 186, 186, 0.47);
  // backdrop-filter: blur(2.5px);
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
.bg {
  background: #F0F0F0;
}
</style>
