<!-- eslint-disable vue/require-prop-type-constructor -->
<template>
  <div class="pdf-viewer py-24">
    <div class="bg-white container mx-auto px-2 xl:px-20 overflow-auto">
      <canvas id="the-canvas" class="w-full overflow-scroll" :style="`width: ${width}%`"></canvas>
    </div>
  </div>
  <!-- footer -->

<!-- footer -->
    <div class="footer fixed bottom-0 left-0 w-full z-50">
      <div class="p-3 xl:p-0 ">
        <div class="mr-auto flex w-full">
          <div class="w-7/12 hidden xl:flex justify-end items-center bg-white">
            <div class="flex items-center mx-2 item py-2 px-3 justify-between">
              <a class="cursor-pointer block prePage-btn" id="prev"><img src="@/assets/img/arrowLeft.png" alt="" class="block object-contain"></a>
              <div class="px-3 flex items-center">
                <p class="p-3"><span id="pageNum"></span></p>
                <span class="px-1">/</span>
                <p class="p-3"><span id="pageCount"></span></p>
              </div>
              <a class="cursor-pointer block nextPage-btn" id="next">
                <img src="@/assets/img/arrowRight.png" alt="" class="block object-contain">
              </a>
            </div>
            <div class="flex items-center mx-2 item py-2 px-3 justify-between">

                <a class="cursor-pointer inline-block" id="next" @click="percentPlus"><img src="@/assets/img/Union1.png" alt=""></a>

              <div class="px-3 flex items-center">
                <p class="p-3">{{ width }}%</p>
              </div>

                <a class="cursor-pointer inline-block" @click="percentMinus"><img src="@/assets/img/Union2.png" alt=""></a>

            </div>
          </div>
          <div class="w-full xl:w-3/12 flex justify-center bg-white rounded-3xl xl:rounded-none">
            <a class="signBtn flex flex-col items-center w-20 py-4 cursor-pointer">
              <div class="icon flex justify-center items-center">
                <img src="@/assets/img/icon/icon1.png" alt="">
              </div>
              <p class="text-sm mt-1">簽名</p>
            </a>
            <a class="selectBtn flex flex-col items-center w-20 py-4" @click="isSelectSign = true">
              <div class="icon flex justify-center items-center cursor-pointer">
                <img src="@/assets/img/icon/icon2.png" alt="">
              </div>
              <p class="text-sm mt-1">勾選</p>
            </a>
            <a class="dateBtn flex flex-col items-center w-20 py-4" @click="selectedDate()">
              <div class="icon flex justify-center items-center cursor-pointer">
                <img src="@/assets/img/icon/icon3.png" alt="">
              </div>
              <p class="text-sm mt-1">日期</p>
            </a>
            <a class="textBtn flex flex-col items-center w-20 py-4" @click="selectedText()">
              <div class="icon flex justify-center items-center cursor-pointer">
                <img src="@/assets/img/icon/icon4.png" alt="">
              </div>
              <p class="text-sm mt-1">插入文字</p>
            </a>
          </div>
          <div class="w-2/12 hidden xl:flex justify-center items-center bg-white">
            <button type="button" class="downloadBtn py-4 px-16 proj-bg-Gradient text-white rounded-3xl proj-border-primary border-2 h-auto" @click="finishSign">
              完成簽署
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core"
export default({
  components: {
  },
  props: {
  },
  mixin: {
  },
  setup () {
    const width = ref(100)

    const percentPlus = () => {
      // console.log(width.value)
      if (width.value < 150) {
        width.value += 10
        console.log(width.value)
      }
    }
    const percentMinus = () => {
      // console.log(width.value)
      if (width.value > 50) {
        width.value -= 10
        console.log(width.value)
      }
    }
    onMounted(() => {
      var url = '/test3.pdf';
      var pdfjsLib = window['pdfjs-dist/build/pdf']

      pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'
      if (document.getElementById('the-canvas')) {


      var pdfDoc = null
      var pageNum = 1
      var pageRendering = false
      var pageNumPending = null
      var scale = 2
      var canvas = document.getElementById('the-canvas')
      var ctx = canvas.getContext('2d')

      const renderPage = (num) => {
        pageRendering = true
        // Using promise to fetch the page
        pdfDoc.getPage(num).then((page) => {
          var viewport = page.getViewport({scale: scale})
          canvas.height = viewport.height
          canvas.width = viewport.width

          var renderContext = {
            canvasContext: ctx,
            viewport: viewport
          }
          var renderTask = page.render(renderContext)

          renderTask.promise.then(() => {
            pageRendering = false
            if (pageNumPending !== null) {
              renderPage(pageNumPending)
              pageNumPending = null
            }
          })
        })

        document.getElementById('pageNum').textContent = num
      }

      const queueRenderPage = (num) => {
        if (pageRendering) {
          pageNumPending = num
        } else {
          renderPage(num)
        }
      }

      const onPrevPage = () => {
        if (pageNum <= 1) {
          return
        }
        pageNum--
        queueRenderPage(pageNum)
      }
      document.getElementById('prev').addEventListener('click', onPrevPage)

      const onNextPage = () => {
        if (pageNum >= pdfDoc.numPages) {
          return
        }
        pageNum++
        queueRenderPage(pageNum)
      }
      document.getElementById('next').addEventListener('click', onNextPage)

      pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
        pdfDoc = pdfDoc_
        document.getElementById('pageCount').textContent = pdfDoc.numPages

        renderPage(pageNum)
      })
      }
    })
    return {
      width,
      percentPlus,
      percentMinus
    }
  },
})
</script>

<style lang="scss" scoped>
  .pdf-viewer {
    background: #F0F0F0;
  }
  .viewer-bg {
    background: rgba(183, 183, 183, 0.4);
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
