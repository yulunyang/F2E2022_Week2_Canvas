<template>
  <div class='pdfShow w-screen h-screen relative'>
    <div class="header-top fixed top-0 left-0 w-full flex p-2 xl:hidden z-50">
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
        <button type="button" class="downloadBtn py-4 w-full proj-bg-Gradient text-white rounded-xl proj-border-primary border-2 h-auto">
          完成簽署
        </button>
      </div>
    </div>

    <img :src="signUrl" class='sign' style='border: 1px solid #000' width='250' height='150' />

    <div class="styledCreate__WrapperRight-sc-1i4fuzv-10 cKAFxH">
      <div id="viewer" tabindex="10" scale="1" class="styled__Wrapper-sc-cpx59f-1 gKmbon overflow-x-hidden">
        <div class="react-pdf__Document">
          <div id="pageContainer1" class="styled__WrapperPage-sc-cpx59f-2 cFGXRm page" width="1101.6000000000001" height="1425.6000000000001" style="">
            <div class="react-pdf__Page" data-page-number="1" style="position: relative;">
              <canvas id="canvas" class="react-pdf__Page__canvas block select-none" dir="ltr" width="2203" height="2851"></canvas>
            </div>
            <!-- <div id="holder-DottedSign_5ca4e6e0-5f1b-11ed-aba8-617d5b381a48" class="styled__Wrapper-sc-v2t1xh-0 evylNs assign-fields" tabindex="57" style="position: absolute; left: 785.797px; top: 606px; width: 217px; height: 110px;">
              <div class="styled__WrapperContent-sc-v2t1xh-1 hSSgBH">
                <div class="styled__Block-sc-v2t1xh-3 iuNogo">
                  <div id="DottedSign_5ca4e6e0-5f1b-11ed-aba8-617d5b381a48" tabindex="2" class="styled__Wrapper-sc-11rhaqg-0 iVUzBV sign-component" style="width: 100%; height: 100%; opacity: 1;">
                    <div class="styled__Back-sc-11rhaqg-1 hiaZb"></div>
                      <div tabindex="3" class="styled__Wrapper-sc-x80qw9-0 iHdadl">
                        <div id="image-parent-DottedSign_5ca4e6e0-5f1b-11ed-aba8-617d5b381a48" class="styled__Wrapper-sc-13135sc-0 kTgXnH">
                          <img :src="signUrl" alt="signature">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div> -->
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
            <button type="button" class="downloadBtn py-4 px-16 proj-bg-Gradient text-white rounded-xl proj-border-primary border-2 h-auto" @click="finishSign">
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
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
// import { useStore } from "vuex"
import bus from '@/bus'
export default {
  name: 'pdfShow',
  components: {
  },
  setup (props, ctx) {
    // const store = useStore()
    bus.on('fileUpload', (v) => {
      pdfInit(v)
    })

    const signUrl = ref('')
    onMounted(() => {
    })
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )
      if (!answer) return false
    })

    const pdfInit = (file) => {
      const Base64Prefix = 'data:application/pdf;base64,'
      const add = document.querySelector('.add')
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js'

      const readBlob = (blob) => {
        console.log('readBlob')
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.addEventListener('load', () => resolve(reader.result))
          reader.addEventListener('error', reject)
          reader.readAsDataURL(blob)
        })
      }

      const printPDF = async(pdfData) => {
        console.log('printPDF')
        pdfData = await readBlob(pdfData)
        const data = atob(pdfData.substring(Base64Prefix.length))

        const pdfDoc = await pdfjsLib.getDocument({ data }).promise
        const pdfPage = await pdfDoc.getPage(1)

        const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        // 控制顯示PDF的寬高
        canvas.height = viewport.height
        canvas.width = viewport.width
        const renderContext = {
          canvasContext: context,
          viewport,
        }
        const renderTask = pdfPage.render(renderContext)

        // 回傳做好的canvas
        return renderTask.promise.then(() => canvas)
      }

      const pdfToImage = async(pdfData) => {
        console.log('pdfToImage')
        const scale = 1 / window.devicePixelRatio
        return new fabric.Image(pdfData, {
          scaleX: scale,
          scaleY: scale,
        })
      }

      const canvas = new fabric.Canvas('canvas')

      const Init = async () => {
        canvas.requestRenderAll()
        const pdfData = await printPDF(file)
        const pdfImage = await pdfToImage(pdfData)

        // 調整canvas大小
        canvas.setWidth(pdfImage.width / window.devicePixelRatio)
        canvas.setHeight(pdfImage.height / window.devicePixelRatio)
        canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
      }
      Init()

    //   document.querySelector('input').addEventListener('change', async (e) => {
    //   canvas.requestRenderAll()
    //   const pdfData = await printPDF(e.target.files[0])
    //   const pdfImage = await pdfToImage(pdfData)

    //   // 調整canvas大小
    //   canvas.setWidth(pdfImage.width / window.devicePixelRatio)
    //   canvas.setHeight(pdfImage.height / window.devicePixelRatio)
    //   canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
    // })

      // 加入簽名
      const sign = document.querySelector('.sign')
      if (localStorage.getItem('vue-canvas')) {
        sign.src = localStorage.getItem('vue-canvas')
      }

      sign.addEventListener('click', () => {
        console.log('sign')
        if (!sign.src) return
        fabric.Image.fromURL(sign.src, function (image) {
          image.top = 400
          image.scaleX = 0.5
          image.scaleY = 0.5
          canvas.add(image)
        })
      })

      // 下載PDF
      // const pdf = new jsPDF()

      // const downloadBtn = document.querySelector('.downloadBtn')
      // downloadBtn.addEventListener('click', () => {
      //   const image = canvas.toDataURL('image/png')
      //   const width = pdf.internal.pageSize.width
      //   const height = pdf.internal.pageSize.height
      //   pdf.addImage(image, 'png', 0, 0, width, height)
      //   pdf.save('download.pdf')

      // })
    }
    const downLoadPdf = () => {
      const pdf = new jsPDF()

      const image = canvas.toDataURL('image/png')
      const width = pdf.internal.pageSize.width
      const height = pdf.internal.pageSize.height
      pdf.addImage(image, 'png', 0, 0, width, height)
      pdf.save('download.pdf')
    }
    const finishSign = async() => {
      await downLoadPdf()

      ctx.emit('finishSign', true)
    }
    return {
      finishSign,
      pdfInit,
      signUrl,
      downLoadPdf
      // addSign
      // store
    }
  }
}
</script>
<style scoped lang="scss">
.pdfShow {
  background: #F0F0F0;
  .react-pdf__Document {
    transform-origin: center top;
    transform: translate3d(0px, 0px, 0px) scale3d(0.883261, 0.883261, 1);
    height: calc(88.3261%);
  }
.cKAFxH {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 70px);
    // height: 100%;
    overflow-y: hidden;
    padding: 48px 100px;
    @media (max-width: 1440px) {
      padding: 100px 1rem;
      height: calc(100% - 10px);
    // padding-top: 90px;
    }
}
.gKmbon {
    width: 100%;
    height: 100%;
    overflow: auto;
    margin-top: -10px;
    margin-bottom: -10px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
}
.gKmbon .react-pdf__Document {
    transform-origin: center top;
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1);
    height: calc(100%);
}
.cFGXRm {
    position: relative;
    max-width: 100%;
    width: 1101.6px;
    height: 1425.6px;
    background-color: white;
    margin: 0px auto 20px;
}
.react-pdf__Page {
  width: 100%;
}
.gKmbon canvas {
    max-width: 100% !important;
    height: auto !important;
    width: 100%;
    height: 100%;
    // max-width: 1000px;
    // max-height: 1425px;
    object-fit: cover;
    // @media (max-width: 1023px) {
    // width: 900px;
    // height: 1425px;
    // }
    // @media (max-width: 768px) {
    // width: 700px;
    // height: 1425px;
    // }
}
  // #canvas {
  //   background: white;
  //   width: 1040px;
  //   height: 1000px;
  // }
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
