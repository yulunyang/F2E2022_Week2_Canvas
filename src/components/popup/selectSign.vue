<template>
  <div class="warningAlert_pdf w-full h-screen left-0 top-0 fixed">
    <div class="select_bg absolute h-screen w-screen left-0 top-0" @click="closeWarning"></div>
    <div class="card-inner absolute text-xl pop-container-choose w-full z-50" v-if="isSelectMode">
      <div class="bg rounded-3xl overflow-hidden shadow-lg w-full">
        <div class="px-4 py-6 flex flex-col justify-center w-full">
          <div class="font-bold text-lg mb-8 whitespace-nowrap text-center proj-text-primary">請選擇簽名</div>
          <div class="overflow-auto selected-h">
            <div class="flex items-center mb-2" v-for="(item, idx) in signArr" :key="idx">
              <div class="h-auto bg-white w-4/5 rounded-3xl py-2" @click="selectedSign(item)">
                <img :src="item" class='sign mx-auto object-contain w-36 h-20' />
              </div>
              <a class="p-2 w-1/5 inline-flex justify-center items-center" @click="delecteSign(idx)">
                <img src="@/assets/img/delete.png" alt="">
              </a>
            </div>
          </div>
          <a class="proj-text-primary block mt-4 font-bold text-lg whitespace-nowrap" @click="isSelectMode = false">+ 新增簽名</a>
        </div>

      </div>
    </div>
    <div class="card-inner absolute text-xl w-full z-50 pop-container" v-if="!isSelectMode">
      <div class="bg rounded-3xl overflow-hidden shadow-lg w-full">

        <div class="index_Sign flex flex-col items-center w-full py-4 px-2">

          <div class="container-pop mx-auto mb-5 text-base md:text-lg">
            <div class="inner-container">
              <div class="toggle" @click="isSignSelf = false">
                <p>匯入簽名檔</p>
              </div>
              <div class="toggle" @click="isSignSelf = true">
                <p>手寫簽名</p>
              </div>
            </div>
            <div class="inner-container" id='toggle-container' :class="{ 'toggle-active': !isSignSelf }">
              <div class="toggle" @click="isSignSelf = false">
                <p>匯入簽名檔</p>
              </div>
              <div class="toggle" @click="isSignSelf = true">
                <p>手寫簽名</p>
              </div>
            </div>
          </div>

          <CanvasModulePop :isSignSelf="isSignSelf" v-on:closeWarning="closeWarning" v-on:getStroke="getStroke" v-on:backToChoose="backToChoose" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import CanvasModulePop from '@/components/modules/CanvasModulePop.vue'
export default {
  name: 'selectSign',
  components: {
    CanvasModulePop
  },
  props: {
  },
  setup (props, ctx) {
    const signArr = ref('')
    const isSelectMode = ref(true)
    const isSignSelf = ref(true)

    onMounted(() => {
      init()

    })
    onUnmounted(() => {
    })

    const init = () => {
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
    }

    const delecteSign = (idx) => {
      let arr = JSON.parse(localStorage.getItem('vue-canvas-array'))
      if (arr.length > 1) {
        arr.splice(idx, 1)
        localStorage.setItem("vue-canvas-array", JSON.stringify(arr))
      } else {
        localStorage.removeItem('vue-canvas-array')
      }


      init()
    }

    const getStroke = (getStroke) => {
      ctx.emit('selectedSign', getStroke)
    }

    const backToChoose = (backToChoose) => {
      closeWarning()
      console.log(backToChoose)
      // isSelectMode.value = backToChoose
    }

    return {
      // url,
      signArr,
      closeWarning,
      selectedSign,
      delecteSign,
      init,
      isSelectMode,
      isSignSelf,
      getStroke,
      backToChoose
    }
  }
}
</script>

<style scoped lang="scss">
.warningAlert_pdf {
  // background: rgba(186, 186, 186, 0.47);
  // backdrop-filter: blur(2.5px);
  z-index: 99;
}
.select_bg {
  background: rgba(186, 186, 186, 0.47);
  backdrop-filter: blur(2.5px);
}
.card-inner {
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.bg {
  background: #F0F0F0;
}

.container-pop {
	width: 240px;
	height: 40px;
	// margin: auto;
	position: relative;
	border-radius: 6px;
	overflow: hidden;
	user-select: none;
	cursor: pointer;
}

.inner-container {
	position: absolute;
	left: 0;
	top: 0;
	width: inherit;
	height: inherit;
	text-transform: uppercase;
	// font-size: .6em;
	// letter-spacing: .2em;
}

.inner-container:first-child {
	background: #ffffff;
	color: #a9a9a9;
}

.inner-container:nth-child(2) {
  background: linear-gradient(180deg, #35A483 0%, #077854 100%);
	color: white;
	clip-path: inset(0 50% 0 0);
	transition: .3s cubic-bezier(0,0,0,1);
}

.toggle {
	width: 50%;
	position: absolute;
	height: inherit;
	display: flex;
	box-sizing: border-box;
}

.toggle p {
	margin: auto;
}

.toggle:nth-child(1) {
	right: 0;
}
.toggle-active {
  clip-path: inset(0 0% 0% 50%) !important;
}

.selected-h {
  height: 18rem;
}
.pop-container-choose {
  max-width: 343px;
}
.pop-container {
  max-width: 600px;
  @media (max-width: 768px) {
    max-width: 343px;
  }
}
</style>
