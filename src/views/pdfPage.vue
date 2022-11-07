<template>
  <div class='home'>
    <div>
      <input type='file' accept='application/pdf' placeholder='選擇PDF檔案' />
    </div>
    <canvas id='canvas'> </canvas>

    <p>選擇簽名</p>
    <img class='sign' />

    <button class='download' @click="download">download PDF</button>
    <router-link :to="{ path: '/' }">上一頁</router-link>
  </div>
</template>

<script>
/* eslint-disable */
import { onMounted } from 'vue'
export default {
  name: 'pdfPage',
  setup () {
    onMounted(() => {
      oninitCanvas()
    })

    const oninitCanvas = () => {
        const Base64Prefix = 'data:application/pdfbase64,'
        const add = document.querySelector('.add')
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js'

        const readBlob = (blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result))
            reader.addEventListener('error', reject)
            reader.readAsDataURL(blob)
          })
        }

        const printPDF = async(pdfData) => {
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

          return renderTask.promise.then(() => canvas)
        }

        const pdfToImage = async(pdfData) => {
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
        if (localStorage.getItem('img')) {
          sign.src = localStorage.getItem('img')
        }

        sign.addEventListener('click', () => {
          if (!sign.src) return
          fabric.Image.fromURL(sign.src, (image) => {
            image.top = 400
            image.scaleX = 0.5
            image.scaleY = 0.5
            canvas.add(image)
          })
        })

        // 下讚PDF
    }
    const download = () => {
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
    return {
      oninitCanvas, download
    }
  }
}
</script>
<style scoped>
#canvas {
  width: 500px;
  height: 300px;
  border: 1px solid #000;
}
.sign {
  width: 250px;
  height: 150px;
  border: 1px solid #000;
}
</style>
