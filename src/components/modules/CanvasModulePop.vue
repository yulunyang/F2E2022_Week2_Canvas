<template>
  <div class="flex flex-col items-center">
    <div class="flex mb-6 justify-between items-center w-full" :class="{ 'invisible': !isSignSelf }">
      <div class="flex">
        <a class="h-8 w-8 rounded-full inline-block bg-black m-2 relative" @click="setColor('#000000')">
          <div class="h-7 w-7 rounded-full inline-block bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" :class="{ 'border-2 border-white': color === '#000000' }"></div>
        </a>
        <a class="h-8 w-8 rounded-full inline-block proj-bg-blue m-2 relative"  @click="setColor('#0014C7')">
          <div class="h-7 w-7 rounded-full inline-block proj-bg-blue absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" :class="{ 'border-2 border-white': color === '#0014C7' }"></div>
        </a>
        <a class="h-8 w-8 rounded-full inline-block proj-bg-red m-2 relative"  @click="setColor('#CA0000')">
          <div class="h-7 w-7 rounded-full inline-block proj-bg-red absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" :class="{ 'border-2 border-white': color === '#CA0000' }"></div>
        </a>
      </div>

      <a @click.prevent="removeSavedStrokes()" class="proj-text-primary cursor-pointer">清除</a>
    </div>
    <div class="source" v-show="isSignSelf">
      <div class="bg-white rounded-3xl">
        <vue-drawing-canvas
          class="z-10"
          canvasId="VueCanvasDrawingPop"
          ref="VueCanvasDrawingPop"
          v-model:image="image"
          :width="600"
          :height="300"
          :stroke-type="strokeType"
          :line-cap="lineCap"
          :line-join="lineJoin"
          :fill-shape="fillShape"
          :eraser="eraser"
          :lineWidth="line"
          :color="color"
          :background-color="backgroundColor"
          :background-image="backgroundImage"
          :watermark="watermark"
          :initial-image="initialImage"
          saveAs="png"
          :styles="{
            'border-radius': '26px',
          }"
          :lock="disabled"
          :additional-images="additionalImages"
        />
      </div>

      <div class="button-container w-full mt-6 xl:mt-10 flex justify-center text-lg">
        <div class="p-2">
          <button @click="closeWarning" type="button" @click.prevent="removeSavedStrokes()" class="py-3 px-3 bg-white proj-text-primary w-36 rounded-lg proj-border-primary border-2">
            取消
          </button>
        </div>
        <div class="p-2">
          <button type="button" @click.prevent="getStrokes()" class="py-3 px-3 proj-bg-Gradient text-white w-36 rounded-lg proj-border-primary border-2">
            建立簽名
          </button>
        </div>

      </div>
    </div>

    <div class="output" v-show="!isSignSelf">

      <div v-if="isFile" style="width: 600px; height: 300px" class="bg-white round">
        <img :src="image" style="border-radius: 26px" />
      </div>
      <div v-else style="width: 600px; height: 300px" class="bg-white round">
        <label for="file-upload-pop" class="custom-file-upload w-full flex items-center justify-center">
          <span>請選擇檔案</span>
        </label>
        <input type="file" @change="setWatermarkImage($event)" accept="image/*" id="file-upload-pop" />
      </div>

      <div class="button-container w-full mt-10 flex justify-center text-lg">
        <div class="p-2">
          <button @click="closeWarning" type="button" class="py-3 px-3 bg-white proj-text-primary w-36 rounded-lg proj-border-primary border-2">
            取消
          </button>
        </div>
        <div class="p-2">
          <button type="button" @click.prevent="getStrokes()" class="py-3 px-3 proj-bg-Gradient text-white w-36 rounded-lg proj-border-primary border-2">
            建立簽名
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import VueDrawingCanvas from "vue-drawing-canvas"
// import bus from '@/bus'
export default {
  name: "CanvasModulePop",
  components: {
    VueDrawingCanvas
  },
  props: {
    isSignSelf: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      initialImage: [
        {
          type: "dash",
          from: {
            x: 262,
            y: 154,
          },
          coordinates: [],
          color: "#000000",
          width: 5,
          fill: false,
        },
      ],
      x: 0,
      y: 0,
      image: "",
      eraser: false,
      disabled: false,
      fillShape: false,
      line: 5,
      color: "#000000",
      strokeType: "dash",
      lineCap: "square",
      lineJoin: "miter",
      backgroundColor: "transparent",
      backgroundImage: null,
      watermark: null,
      additionalImages: [],

      isFile: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    closeWarning ()  {
      this.$emit('closeWarning')
    },
    init () {
      if ("vue-drawing-canvas" in window.localStorage) {
        this.initialImage = JSON.parse(
          window.localStorage.getItem("vue-drawing-canvas")
        )
      } else {
          this.initialImage = [
          {
            type: "dash",
            from: {
              x: 262,
              y: 154,
            },
            coordinates: [],
            color: "#000000",
            width: 5,
            fill: false,
          },
        ]
      }
    },
    async setImage (event) {
      let URL = window.URL
      this.backgroundImage = URL.createObjectURL(event.target.files[0])
      await this.$refs.VueCanvasDrawing.redraw()
    },
    async setWatermarkImage (event) {
      let self = this
      let URL = window.URL
      self.watermark = {
        type: "Image",
        source: URL.createObjectURL(event.target.files[0]),
        x: 0,
        y: 0,
        imageStyle: {
          width: 600,
          height: 300,
        }
      }
      console.log(self.$refs.VueCanvasDrawingPop)
      await self.$refs.VueCanvasDrawingPop.redraw()
      self.isFile = true
    },
    getCoordinate (event) {
      let coordinates = this.$refs.VueCanvasDrawingPop.getCoordinates(event)
      this.x = coordinates.x
      this.y = coordinates.y
    },
    getStrokes () {
      localStorage.setItem("vue-drawing-canvas", JSON.stringify(this.$refs.VueCanvasDrawingPop.getAllStrokes()))
      localStorage.setItem("vue-canvas", this.image)

      let signArr
      if (localStorage.getItem('vue-canvas-array')) {
        signArr = JSON.parse(localStorage.getItem('vue-canvas-array'))
        signArr.push(this.image)
      } else {
        signArr = [this.image]
      }
      localStorage.setItem("vue-canvas-array", JSON.stringify(signArr))

      // bus.emit('reloadSign')
    },
    removeSavedStrokes() {
      window.localStorage.removeItem("vue-drawing-canvas")

      this.$refs.VueCanvasDrawingPop.reset()
    },
    setColor (color) {
      this.color = color
    }
  }
}
</script>

<style scoped>
.button-container > * {
  margin-top: 15px;
  margin-right: 10px;
}
.output input[type=file] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}
.round {
  border-radius: 26px;
}
label {
	width: 100%;
  height: 100%;
	text-align: center;
  font-size: 20px;
  font-weight: 600;
  font-family: sans-serif;
  cursor: pointer;
  /* display: inline-block; */
  overflow: hidden;
  color: #B7B7B7;
  background: none;
}
</style>