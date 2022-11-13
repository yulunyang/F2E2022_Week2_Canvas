<!-- eslint-disable vue/require-prop-type-constructor -->
<template>
  <div class='pdfShow w-screen h-screen relative overflow-x-hidden'>

    <SelectSign v-if="isSelectSign" @closeWarning="closeWarning" @selectedSign="selectedSign"  />

    <div class="header-top fixed top-0 left-0 w-full flex p-2 xl:hidden z-50">
      <div class="w-9/12 p-2">
        <div class="flex items-center item py-2 px-3 justify-between bg-white rounded-3xl">
          <a class="cursor-pointer block prev-btn" id="prev-btn"><img src="@/assets/img/arrowLeft.png" alt=""></a>
          <div class="px-3 flex items-center">
            <p class="p-3"><span id="page_num" class="pageNum">1</span></p>
            <span class="px-1">/</span>
            <p class="p-3"><span id="page_count" class="pageCount">1</span></p>
          </div>
          <a class="cursor-pointer block next-btn"><img src="@/assets/img/arrowRight.png" alt=""></a>
        </div>
      </div>
      <div class="w-3/12 md:p-2 flex justify-center items-center">
        <button type="button" class="downloadBtn py-4 w-full proj-bg-Gradient text-white rounded-3xl proj-border-primary border-2 h-auto"
          @click="finishSign">
          完成簽署
        </button>
      </div>
    </div>

    <div class="pdf-viewer pt-24 pb-28">
      <div class="container mx-auto px-2 xl:px-24">
        <div class="bg-white">
          <canvas id="the-canvas" :style="`width: ${width}% !important`"></canvas>
        </div>
      </div>
    </div>

<!-- footer -->
    <div class="footer fixed bottom-0 left-0 w-full z-50">
      <div class="p-3 xl:p-0 ">
        <div class="mr-auto flex w-full">
          <div class="w-7/12 hidden xl:flex justify-end items-center bg-white">

            <!-- 前一頁/下一頁 -->
            <div class="flex items-center mx-2 item py-2 px-3 justify-between">
              <a class="cursor-pointer block prePage-btn" id="prev"><img src="@/assets/img/arrowLeft.png" alt="" class="block object-contain"></a>
              <div class="px-3 flex items-center">
                <p class="p-3"><span id="pageNum" class="pageNum">1</span></p>
                <span class="px-1">/</span>
                <p class="p-3"><span id="pageCount"  class="pageCount">1</span></p>
              </div>
              <a class="cursor-pointer block next-btn" id="next-btn">
                <img src="@/assets/img/arrowRight.png" alt="" class="block object-contain">
              </a>
            </div>

            <!-- 放大縮小 -->
            <div class="flex items-center mx-2 item py-2 px-3 justify-between">
              <a class="cursor-pointer inline-block" @click="percentPlus"><img src="@/assets/img/Union1.png" alt=""></a>
              <div class="px-3 flex items-center">
                <p class="p-3">{{ width }}%</p>
              </div>
              <a class="cursor-pointer inline-block" @click="percentMinus"><img src="@/assets/img/Union2.png" alt=""></a>
            </div>
          </div>

          <!-- 插入圖片 -->
          <div class="w-full xl:w-3/12 flex justify-center bg-white rounded-3xl xl:rounded-none">
            <a class="signBtn flex flex-col items-center w-20 py-4 cursor-pointer" @click="setSign()">
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
            <button type="button" class="downloadBtn py-4 px-16 proj-bg-Gradient text-white rounded-3xl proj-border-primary border-2 h-auto"
              @click="finishSign">
              完成簽署
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core"
import { fabric } from 'fabric'
import  * as moment  from "moment"
import Swal from 'sweetalert2'
import SelectSign from '@/components/popup/selectSign.vue'
import jsPDF from "jspdf"
var canvas = null
export default({
  components: {
    SelectSign
  },
  props: {
  },
  mixin: {
  },
  setup (props, ctx) {
    const width = ref(100)
    const isSelectSign = ref(false)
    const signUrl = ref('')
    const fileWidth = ref(1300)
    const fileHeight = ref(1600)

    onMounted (async () => {
      if (localStorage.getItem('vue-canvas')) {
        signUrl.value = localStorage.getItem('vue-canvas')
      }
      await initPdf()
      await initFabric()
    })

    const initPdf = () => {
      var url = '/test3.pdf';
      var pdfjsLib = window['pdfjs-dist/build/pdf']

      pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'

      var pdfDoc = null
      var pageNum = 1
      var pageRendering = false
      var pageNumPending = null
      var scale = 2
      var canvasImage = document.getElementById('the-canvas')
      var ctx = canvasImage.getContext('2d')

      const renderPage = (num) => {
        pageRendering = true
        pdfDoc.getPage(num).then((page) => {
          var viewport = page.getViewport({ scale: scale })
          canvasImage.height = viewport.height
          canvasImage.width = viewport.width

          fileWidth.value = viewport.width
          fileHeight.value = viewport.height

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
      document.querySelector('#next-btn').addEventListener('click', onNextPage)

      pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
        pdfDoc = pdfDoc_
        document.getElementById('pageCount').textContent = pdfDoc.numPages

        renderPage(pageNum)
      })

    }
    const initFabric = async() => {
      // const canvas = new fabric.Canvas("the-canvas")

      //   canvas.requestRenderAll();
      //   const pdfData = await printPDF(e.target.files[0])
      //   const pdfImage = await pdfToImage(pdfData)

      //   // 透過比例設定 canvas 尺寸
      //   canvas.setWidth(pdfImage.width / window.devicePixelRatio)
      //   canvas.setHeight(pdfImage.height / window.devicePixelRatio)

      //   // 將 PDF 畫面設定為背景
      //   canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))

      canvas = new fabric.Canvas('the-canvas')
      canvas.setDimensions({ width: window.innerHeight, height: window.innerWidth, })
    }
    const percentPlus = () => {
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

    const setSign = () => {
      fabric.Image.fromURL(signUrl.value, (image) => {
        image.top = 0
        image.scaleX = 0.5
        image.scaleY = 0.5
        canvas.add(image)
      })
    }
    const selectedSign = (selectedSign) => {
      console.log(selectedSign)
      // const canvas = new fabric.Canvas('canvas')
      fabric.Image.fromURL(selectedSign, (image) => {
        image.top = 0
        image.scaleX = 0.5
        image.scaleY = 0.5
        canvas.add(image)
      })
    }
    const selectedText = () => {
      console.log('selectedText')
      Swal.fire({
        input: 'textarea',
        inputAttributes: {
          autocapitalize: 'off'
        },
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        customClass: {
          popup: 'customClass-popup rounded-3xl py-6 w-auto px-5',
          title: 'customClass-title font-bold text-black pt-6 px-0',
          input: 'customClass-input',
          inputLabel: '',
          actions: 'btns',
          confirmButton: 'btn btn-confirm',
          cancelButton: 'btn btn-cancel',
        }
      }).then((result) => {
        if (result.value) {
          console.log(result.value)
          let textInput = new fabric.Text(result.value, (image) => {
            image.top = 10
            image.left = 10
            image.scaleX = 0.5
            image.scaleY = 0.5
          })
          canvas.add(textInput)
        }
      })
    }
    const selectedDate = () => {
      const today = moment().format('YYYY/MM/DD')
      let text = new fabric.Text(today, (image) => {
        image.top = 10
        image.left = 10
        image.scaleX = 0.5
        image.scaleY = 0.5
      })
      canvas.add(text)
    }
    const closeWarning = (closeWarning) => {
      isSelectSign.value = closeWarning
    }

    const finishSign = async() => {
      let num = Math.floor(Math.random() * 100) + 1
      if (num < 95) {
        await downLoadPdf()

        ctx.emit('finishSign', true)
      }
      ctx.emit('finishSign', false)
    }
    const downLoadPdf = () => {
      const pdf = new jsPDF()

      const image = canvas.toDataURL('image/png')
      const width = pdf.internal.pageSize.width
      const height = pdf.internal.pageSize.height
      pdf.addImage(image, 'png', 0, 0, width, height)
      pdf.save('download.pdf')
    }
    return {
      fileWidth,
      fileHeight,
      isSelectSign,
      width,
      // pageNum,
      // pageCount,
      percentPlus,
      percentMinus,
      initPdf,
      initFabric,
      canvas,
      selectedText,
      selectedDate,
      signUrl,
      setSign,
      selectedSign,
      closeWarning,
      finishSign,
      downLoadPdf
    }
  },
})
</script>

<style lang="scss">
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
  .canvas-container {
    min-height: 90vh !important;
    width: 100% !important;
  }
  canvas {
    height: auto !important;
    width: 100% !important;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
</style>
