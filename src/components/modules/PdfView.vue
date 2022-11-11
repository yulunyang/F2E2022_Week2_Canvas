<!-- eslint-disable vue/require-prop-type-constructor -->
<template>
<!-- <div>
  <button id="prev">Previous</button>
  <button id="next">Next</button>
  &nbsp; &nbsp;
  <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
</div> -->

<canvas id="the-canvas" class="w-full"></canvas>
<!-- footer -->
<div class="footer fixed bottom-3 xl:bottom-5 left-1/2 z-50 -translate-x-1/2">
  <div class="p-3 xl:p-0 ">
    <div class="mr-auto flex w-full">
      <div class="justify-end items-center viewer-bg">
        <div class="flex items-center mx-2 item py-2 px-3 justify-between">
          <a class="cursor-pointer block prePage-btn" id="prev"><img src="@/assets/img/arrowLeft.png" alt="" class="block object-contain"></a>
          <div class="px-3 flex items-center">
            <p class="p-3"><span id="page_num"></span></p>
            <span class="px-1">/</span>
            <p class="p-3"><span id="page_count"></span></p>
          </div>
          <div>
          <a class="cursor-pointer block nextPage-btn" id="next"><img src="@/assets/img/arrowRight.png" alt="" class="block object-contain"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- footer -->
</template>

<script>
import { onMounted } from "@vue/runtime-core"
export default({
  components: {
  },
  props: {
  },
  mixin: {
  },
  setup () {
    onMounted(() => {
      var url = '/test.pdf';
      var pdfjsLib = window['pdfjs-dist/build/pdf']

      // The workerSrc property shall be specified.
      pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'
      if (document.getElementById('the-canvas')) {


      var pdfDoc = null
      var pageNum = 1
      var pageRendering = false
      var pageNumPending = null
      var scale = 0.8
      var canvas = document.getElementById('the-canvas')
      var ctx = canvas.getContext('2d')

      /**
       * Get page info from document, resize canvas accordingly, and render page.
       * @param num Page number.
       */
      const renderPage = (num) => {
        pageRendering = true
        // Using promise to fetch the page
        pdfDoc.getPage(num).then((page) => {
          var viewport = page.getViewport({scale: scale})
          canvas.height = viewport.height
          canvas.width = viewport.width

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: ctx,
            viewport: viewport
          }
          var renderTask = page.render(renderContext)

          // Wait for rendering to finish
          renderTask.promise.then(() => {
            pageRendering = false
            if (pageNumPending !== null) {
              // New page rendering is pending
              renderPage(pageNumPending)
              pageNumPending = null
            }
          })
        })

        // Update page counters
        document.getElementById('page_num').textContent = num
      }

      /**
       * If another page rendering in progress, waits until the rendering is
       * finised. Otherwise, executes rendering immediately.
       */
      const queueRenderPage = (num) => {
        if (pageRendering) {
          pageNumPending = num
        } else {
          renderPage(num)
        }
      }

      /**
       * Displays previous page.
       */
      const onPrevPage = () => {
        if (pageNum <= 1) {
          return
        }
        pageNum--
        queueRenderPage(pageNum)
      }
      document.getElementById('prev').addEventListener('click', onPrevPage)

      /**
       * Displays next page.
       */
      const onNextPage = () => {
        if (pageNum >= pdfDoc.numPages) {
          return
        }
        pageNum++
        queueRenderPage(pageNum)
      }
      document.getElementById('next').addEventListener('click', onNextPage)

      /**
       * Asynchronously downloads PDF.
       */
      pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
        pdfDoc = pdfDoc_
        document.getElementById('page_count').textContent = pdfDoc.numPages

        // Initial/first page rendering
        renderPage(pageNum)
      })
      }
    })
    return {}
  },
})
</script>

<style lang="scss" scoped>
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
