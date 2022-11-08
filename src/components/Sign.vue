<template>
  <div class='Sign w-screen h-screen flex items-center justify-center overflow-hidden relative'>
    <div class="index_Sign flex flex-col items-center w-full">

      <div class="toggle_btns mb-6">
        <input id="toggle-on" class="toggle toggle-left" name="toggle" value="false" type="radio" checked>
        <label for="toggle-on" class="btn">手寫簽名</label>
        <input id="toggle-off" class="toggle toggle-right" name="toggle" value="true" type="radio">
        <label for="toggle-off" class="btn">匯入簽名檔</label>
      </div>

      <!-- <div class="flex mb-4">
        <a href="" class="h-8 w-8 rounded-full inline-block bg-black m-2"></a>
        <a href="" class="h-8 w-8 rounded-full inline-block bg-blue-700 m-2"></a>
        <a href="" class="h-8 w-8 rounded-full inline-block bg-red-700 m-2"></a>
      </div> -->

      <CanvasModule v-on:setStep="setStep" />

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { onMounted } from 'vue'
import CanvasModule from '@/components/modules/CanvasModule.vue'
export default {
  name: 'Sign',
  components: {
    CanvasModule
  },
  setup (props, ctx) {
    onMounted(() => {
    })

    const setStep = (setStep) => {
      console.log(setStep)
      ctx.emit('setStep2')
    }

    return {
      setStep
    }
  }
}
</script>
<style scoped lang="scss">
.Sign{
  background: rgba(240, 240, 240, 0.58);
}
.index_Sign{
  // background: rgba(255, 255, 255, 1);
  // border-radius: 34px;
  height: 100%;
  max-height: 80%;
  max-width: 1040px;
  // @media (max-width: 1023px) {
  //   max-height: 100vh;
  //   border-radius: 0;
  // }
}
.toggle_btns {

.btn{
    display: inline-block;
    padding: 10px;
    position: relative;
    text-align: center;
    transition: background 600ms ease, color 600ms ease;
}

input[type="radio"].toggle {
    display: none;
    & + label{
        cursor: pointer;
        min-width: 60px;
        &:hover{
            background: none;
            color: #1a1a1a;
        }
        &:after{
            background: linear-gradient(180deg, #35A483 0%, #077854 100%);
            border-radius: 14px;
            content: "";
            height: 100%;
            position: absolute;
            top: 0;
            transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
            width: 100%;
            z-index: -1;
        }
    }
    &.toggle-left + label {
        border-right: 0;
        &:after{
            left: 100%
        }
    }
    &.toggle-right + label{
        margin-left: -5px;
        &:after{
            left: -100%;
        }
    }
    &:checked + label {
        cursor: default;
        color: #fff;
        transition: color 200ms;
        &:after{
            left: 0;
        }
    }
}
}
</style>
