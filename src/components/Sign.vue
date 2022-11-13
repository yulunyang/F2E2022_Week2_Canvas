<template>
  <div class='Sign w-screen h-screen flex items-center justify-center overflow-hidden relative'>
    <div class="index_Sign flex flex-col items-center w-full">

      <div id="container" class="mx-auto mb-5 xl:mb-10">
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

      <CanvasModule v-on:setStep="setStep" :isSignSelf="isSignSelf" />

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { onMounted,ref } from 'vue'
import CanvasModule from '@/components/modules/CanvasModule.vue'
export default {
  name: 'Sign',
  components: {
    CanvasModule,
  },
  setup (props, ctx) {
    const isSignSelf = ref(true)
    onMounted(() => {
    })

    const setStep = (setStep) => {
      ctx.emit('setStep2')
    }

    return {
      setStep,
      isSignSelf
    }
  }
}
</script>
<style scoped lang="scss">
.Sign{
  background: rgba(240, 240, 240, 0.58);
}
.index_Sign {
  margin-top: 180px;
  @media (max-width: 1024px) {
    margin-top: 90px;
  }
  height: 100%;
  // max-height: 80%;
  max-width: 1040px;
}
#container {
	width: 228px;
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
</style>
