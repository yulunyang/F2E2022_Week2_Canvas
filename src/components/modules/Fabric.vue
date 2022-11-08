<template>
  <div class='Fabric'>
    <div>
      <input type='file' accept='application/pdf' placeholder='選擇PDF檔案' />
    </div>

    <canvas id='canvas' style='border: 1px solid #000'> </canvas>

    <p>選擇簽名</p>
    <img class='sign' style='border: 1px solid #000' width='250' height='150' />

    <button class="py-2 px-3 bg-gray-600 text-white download">download PDF</button>
    <a @click="$emit('setStep', 0)">上一頁</a>
  </div>
</template>

<script>
/* eslint-disable */
import { onMounted, ref } from 'vue'
export default {
  name: 'FabricPage',
  setup () {
    const isPDfFile = ref(false)
    onMounted(() => {
      const Base64Prefix = 'data:application/pdf;base64,'
      const add = document.querySelector('.add')
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://mozilla.github.io/pdf.js/build/pdf.worker.js'

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

      // 下讚PDF
      const pdf = new jsPDF()
      const download = document.querySelector('.download')
      download.addEventListener('click', () => {
        const image = canvas.toDataURL('image/png')
        const width = pdf.internal.pageSize.width
        const height = pdf.internal.pageSize.height
        pdf.addImage(image, 'png', 0, 0, width, height)
        pdf.save('download.pdf')
      });
    })

    return {
      isPDfFile
    }
  }
}
</script>
<style scoped>
</style>
