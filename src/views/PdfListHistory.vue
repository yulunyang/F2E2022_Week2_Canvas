<template>
  <!-- header -->
  <div class="header w-full flex justify-between items-center proj-bg-primary py-1 xl:hidden">
    <router-link :to="{ name: 'documents' }" class="inline-block p-4"><i class="fa-solid fa-chevron-left text-white text-lg"></i></router-link>
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
    <div class="max-w-4xl mx-auto">
      <PdfView />
    </div>
  </div>

</template>

<script>
import PdfView from '@/components/modules/PdfView.vue'
export default {
  name: "ServeDev",
  components: {
    PdfView
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