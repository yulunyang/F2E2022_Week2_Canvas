<template>
  <div class='pdfShow w-screen h-screen relative'>
    <div class="header-top fixed top-0 left-0 w-full flex p-2 xl:hidden">
      <div class="w-9/12 p-2">
          <div class="flex items-center item py-2 px-3 justify-between bg-white rounded-xl">
            <div>
              <div><img src="@/assets/img/arrowLeft.png" alt=""></div>
            </div>
            <div class="px-3 flex items-center">
              <p class="p-3">1</p>
              <span class="px-1">/</span>
              <p class="p-3">2</p>
            </div>
            <div>
              <div><img src="@/assets/img/arrowRight.png" alt=""></div>
            </div>
          </div>
      </div>
      <div class="w-3/12 md:p-2 flex justify-center items-center">
        <button type="button" class="py-4 w-full proj-bg-Gradient text-white rounded-xl proj-border-primary border-2 h-auto">
          完成簽署
        </button>
      </div>
    </div>

    <div class="index_Sign flex-col items-center w-full mt-20 relative inline-flex overflow-y-hidden px-36 py-24">
      <div class="w-full h-full overflow-auto -mt-6 -mb-6 flex flex-col items-center">
        <div class="rect ">
          <div class="relative max-w-full">
            <canvas id='canvas' class="w-full h-auto"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="footer fixed bottom-0 left-0 w-full ">
      <div class="p-3 xl:p-0 ">
        <div class="mr-auto flex w-full">
          <div class="w-7/12 hidden xl:flex justify-end items-center bg-white">
            <div class="flex items-center mx-2 item py-2 px-3 justify-between">
              <div>
                <div><img src="@/assets/img/arrowLeft.png" alt=""></div>
              </div>
              <div class="px-3 flex items-center">
                <p class="p-3">1</p>
                <span class="px-1">/</span>
                <p class="p-3">2</p>
              </div>
              <div>
                <div><img src="@/assets/img/arrowRight.png" alt=""></div>
              </div>
            </div>
            <div class="flex items-center mx-2 item py-2 px-3 justify-between">
              <div>
                <div><img src="@/assets/img/Union1.png" alt=""></div>
              </div>
              <div class="px-3 flex items-center">
                <p class="p-3">100%</p>
              </div>
              <div>
                <div><img src="@/assets/img/Union2.png" alt=""></div>
              </div>
            </div>
          </div>
          <div class="w-full xl:w-3/12 flex justify-center bg-white rounded-xl xl:rounded-none">
            <a href="" class="flex flex-col items-center w-20 py-4">
              <div class="icon flex justify-center items-center">
                <img src="@/assets/img/icon/icon1.png" alt="">
              </div>
              <p class="text-sm mt-1">簽名</p>
            </a>
            <a href="" class="flex flex-col items-center w-20 py-4">
              <div class="icon flex justify-center items-center">
                <img src="@/assets/img/icon/icon2.png" alt="">
              </div>
              <p class="text-sm mt-1">勾選</p>
            </a>
            <a href="" class="flex flex-col items-center w-20 py-4">
              <div class="icon flex justify-center items-center">
                <img src="@/assets/img/icon/icon3.png" alt="">
              </div>
              <p class="text-sm mt-1">日期</p>
            </a>
            <a href="" class="flex flex-col items-center w-20 py-4">
              <div class="icon flex justify-center items-center">
                <img src="@/assets/img/icon/icon4.png" alt="">
              </div>
              <p class="text-sm mt-1">插入文字</p>
            </a>
          </div>
          <div class="w-2/12 hidden xl:flex justify-center items-center bg-white">
            <button type="button" class="py-4 px-16 proj-bg-Gradient text-white rounded-xl proj-border-primary border-2 h-auto">
              完成簽署
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { onMounted } from 'vue'

export default {
  name: 'Sign',
  components: {
  },
  setup () {
    onMounted(() => {
    })

    return {
    }
  }
}
</script>
<style scoped lang="scss">
.pdfShow {
  background: #F0F0F0;
  #canvas {
    background: white;
  }
}
.footer {
  box-shadow: 1px -1px 6px rgba(0, 0, 0, 0.11);
  @media (max-width: 1023px) {
    box-shadow: none;
    // padding-top: 90px;
  }
  .item {
    background: #FFFFFF;
    box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.11);
    border-radius: 16px;
    width: 200px;
  }
  .icon {
    width: 40px;
    height: 40px;
    background: #F0F0F0;
    border-radius: 9px;
    img {
      width: 19px;
      height: 19px;
    }
    p {
      color: #B7B7B7;
    }
  }
}
</style>
