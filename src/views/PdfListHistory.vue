<template>
  <!-- header -->
  <div class="header w-full flex justify-between items-center proj-bg-primary py-1 xl:hidden fixed w-full top-0 left-0">
    <router-link :to="{ name: 'records' }" class="inline-block p-4"><i class="fa-solid fa-chevron-left text-white text-lg"></i></router-link>
  </div>
  <header class="fixed w-full top-0 left-0 z-50 hidden xl:block">
    <div class="mx-auto py-4 px-6 md:px-28 lg:px-8 lg:pr-36">
      <div class="flex justify-between w-full items-end lg:items-center">
        <div class="flex items-center">
          <router-link :to="{ name: 'home' }" class="block px-3 cursor-pointer "><img src="@/assets/img/logo.png" alt="" class="object-contain block"></router-link>
        </div>
      </div>
    </div>
  </header>
  <!-- header -->

  <div class="min-h-screen pdfViewer">


  </div>

  <!-- footer -->
  <div class="footer fixed bottom-3 xl:bottom-5 left-1/2 z-50 -translate-x-1/2">
    <div class="p-3 xl:p-0 ">
      <div class="mr-auto flex w-full">
        <div class="justify-end items-center viewer-bg">
          <div class="flex items-center mx-2 item py-2 px-3 justify-between">
            <!-- <div> -->
              <a class="cursor-pointer block prePage-btn"><img src="@/assets/img/arrowLeft.png" alt="" class="block object-contain"></a>
            <!-- </div> -->
            <div class="px-3 flex items-center">
              <p class="p-3">1</p>
              <span class="px-1">/</span>
              <p class="p-3">2</p>
            </div>
            <div>
              <a class="cursor-pointer block nextPage-btn"><img src="@/assets/img/arrowRight.png" alt="" class="block object-contain"></a>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
  <!-- footer -->
</template>

<script>
// import HeaderSection from '@/components/modules/headerSection.vue'
export default {
  name: "ServeDev",
  components: {
    // HeaderSection
  },
  data () {
    return {
      step: 0
    };
  },
  methods: {
    setStep (setStep) {
      this.step = setStep
    }
  },
};
</script>

<style scoped>
.pdfViewer {
  background: rgba(240, 240, 240, 0.58);
}
.viewer-bg {
  background: rgba(183, 183, 183, 0.24);
  border-radius: 16px;
}
.prePage-btn {
width: 30px;
height: 30px;

}
.nextPage-btn {
  width: 30px;
height: 30px;

}
</style>