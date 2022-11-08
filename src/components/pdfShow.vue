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
        <button type="button" class="py-4 w-full proj-bg-Gradient text-white rounded-xl proj-border-primary border-2 h-auto" @click="finishSign">
          完成簽署
        </button>
      </div>
    </div>
    <div class="styledCreate__WrapperRight-sc-1i4fuzv-10 cKAFxH">
      <div id="viewer" tabindex="10" scale="1" class="styled__Wrapper-sc-cpx59f-1 gKmbon overflow-x-hidden">
        <div class="react-pdf__Document">
          <div id="pageContainer1" class="styled__WrapperPage-sc-cpx59f-2 cFGXRm page" width="1101.6000000000001" height="1425.6000000000001" style="">
            <div class="react-pdf__Page" data-page-number="1" style="position: relative;">
              <canvas id="canvas" class="react-pdf__Page__canvas block select-none" dir="ltr" width="2203" height="2851"></canvas>
            </div>
            <div id="holder-DottedSign_5ca4e6e0-5f1b-11ed-aba8-617d5b381a48" class="styled__Wrapper-sc-v2t1xh-0 evylNs assign-fields" tabindex="57" style="position: absolute; left: 785.797px; top: 606px; width: 217px; height: 110px;">
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
            </div>
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
            <button type="button" class="py-4 px-16 proj-bg-Gradient text-white rounded-xl proj-border-primary border-2 h-auto" @click="finishSign">
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
// import { useStore } from "vuex"
import bus from '@/bus'
export default {
  name: 'pdfShow',
  components: {
  },
  setup (props, ctx) {
    // const store = useStore()
    bus.on('fileUpload', (v) => {
      console.log(v)
    })

    const signUrl = ref('data:image/png;base64,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')
    onMounted(() => {
      // pdfInit()
    })

    const finishSign = () => {
      ctx.emit('finishSign', true)
    }

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

      document.querySelector('input').addEventListener('change', async (e) => {
      canvas.requestRenderAll()
      const pdfData = await printPDF(e.target.files[0])
      const pdfImage = await pdfToImage(pdfData)

      // 調整canvas大小
      canvas.setWidth(pdfImage.width / window.devicePixelRatio)
      canvas.setHeight(pdfImage.height / window.devicePixelRatio)
      canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
    })

      // 加入簽名
      const sign = document.querySelector('.sign')
      if (localStorage.getItem('vue-canvas')) {
        sign.src = localStorage.getItem('vue-canvas')
      }

      sign.addEventListener('click', () => {
        if (!sign.src) return
        fabric.Image.fromURL(sign.src, function (image) {
          image.top = 400
          image.scaleX = 0.5
          image.scaleY = 0.5
          canvas.add(image)
        })
      })

      // 下載PDF
      const pdf = new jsPDF()
      const download = document.querySelector('.download')
      download.addEventListener('click', () => {
        const image = canvas.toDataURL('image/png')
        const width = pdf.internal.pageSize.width
        const height = pdf.internal.pageSize.height
        pdf.addImage(image, 'png', 0, 0, width, height)
        pdf.save('download.pdf')
      })
    }

    const downLoadPdf = () => {

    }

    return {
      finishSign,
      pdfInit,
      signUrl,
      downLoadPdf
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
    @media (max-width: 1023px) {
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
