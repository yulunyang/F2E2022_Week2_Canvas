<template>
  <div class="flex flex-col items-center">
    <div class="flex mb-6" :class="{ 'invisible': !isSignSelf }">
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
    <div class="source" v-show="isSignSelf">
      <div class="bg-white rounded-3xl">
        <vue-drawing-canvas
          ref="VueCanvasDrawing"
          v-model:image="image"
          :width="600"
          :height="400"
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
      <!-- @mousemove="getCoordinate($event)" -->
      <!-- <p>
        x-axis: <strong>{{ x }}</strong
        >, y-axis: <strong>{{ y }}</strong>
      </p> -->
      <!-- <div class="button-container">
        <button type="button" @click.prevent="disabled = !disabled">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-lock"
            viewBox="0 0 16 16"
          >
            <path
              v-if="!disabled"
              d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
            />
            <path
              v-else
              d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
            />
          </svg>
          <span v-if="!disabled">Unlock</span>
          <span v-else>Lock</span>
        </button>
        <button type="button" @click.prevent="$refs.VueCanvasDrawing.undo()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-counterclockwise"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
            />
            <path
              d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
            />
          </svg>
          Undo
        </button>
        <button type="button" @click.prevent="$refs.VueCanvasDrawing.redo()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path
              d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
            />
          </svg>
          Redo
        </button>
        <button
          type="button"
          @click.prevent="$refs.VueCanvasDrawing.redraw()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-repeat"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
            />
            <path
              fill-rule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
            />
          </svg>
          Refresh
        </button>
        <button type="button" @click.prevent="$refs.VueCanvasDrawing.reset()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-file-earmark"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
            />
          </svg>
          Reset
        </button>
      </div> -->
    <!-- <div class="button-container">
        <button type="button" @click.prevent="eraser = !eraser">
          <span v-if="eraser">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eraser"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
              />
            </svg>
            Eraser
          </span>
          <span v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              />
            </svg>
            Draw
          </span>
        </button>
        <select v-model="line">
          <option v-for="n in 25" :key="'option-' + n" :value="n">
            {{ n }}
          </option>
        </select>
        <input type="color" v-model="color" />
        <select v-model="strokeType">
          <option value="dash">Dash</option>
          <option value="line">Straight Line</option>
          <option value="circle">Circle</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="half_triangle">Half Triangle</option>
        </select>
        <select v-model="lineCap">
          <option value="round">lineCap Round</option>
          <option value="square">lineCap Square</option>
          <option value="butt">lineCap butt</option>
        </select>
        <select v-model="lineJoin">
          <option value="round">lineJoin Round</option>
          <option value="miter">lineJoin miter</option>
          <option value="bevel">lineJoin bevel</option>
        </select>
        <button type="button" @click.prevent="fillShape = !fillShape">
          <span v-if="fillShape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-square-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"
              />
            </svg>
            Fill
          </span>
          <span v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
            </svg>
            Stroke
          </span>
        </button>
      </div> -->
      <!-- <div class="button-container">
        <button type="button" @click.prevent="getStrokes()" class="py-2 px-3 bg-gray-600 text-white">
          Save All Strokes
        </button>
        <button type="button" @click.prevent="removeSavedStrokes()" class="py-2 px-3 bg-gray-300 text-white">
          Remove Saved Strokes
        </button>
      </div> -->
      <!-- <div class="button-container flex">
        <div style="margin-right: 30px">
          <p style="margin-bottom: 0">Background Color:</p>
          <input type="color" v-model="backgroundColor" />
        </div>
        <div>
          <p style="margin-bottom: 0">Upload Background Image:</p>
          <input type="file" @change="setImage($event)" />
        </div>
        <div>
          <p>Upload Watermark Image:</p>
          <input type="file" @change="setWatermarkImage($event)" />
        </div>
      </div> -->
      <div class="button-container w-full mt-6 xl:mt-10 flex text-lg">
        <div class="w-1/2 p-2">
          <button type="button" @click.prevent="removeSavedStrokes()" class="py-3 px-3 bg-white proj-text-primary w-full rounded-lg proj-border-primary border-2">
            清除
          </button>
        </div>
        <div class="w-1/2 p-2">
          <button type="button" @click.prevent="getStrokes()" class="py-3 px-3 proj-bg-Gradient text-white w-full rounded-lg proj-border-primary border-2">
            建立簽名
          </button>
        </div>

      </div>
    </div>

    <div class="output" v-show="!isSignSelf">

      <div v-if="isFile" style="width: 600px; height: 400px" class="bg-white round">
        <img :src="image" style="border-radius: 26px" />
      </div>
      <div v-else style="width: 600px; height: 400px" class="bg-white round">
        <label  for="file-upload" class="custom-file-upload w-full flex items-center justify-center">
          <span>請選擇檔案</span>
        </label>
        <input type="file" @change="setWatermarkImage($event)" accept="image/*" id="file-upload" />
      </div>

      <div class="button-container w-full mt-10 flex text-lg">
        <div class="w-1/2 p-2">
          <button type="button" @click.prevent="removeSavedStrokes()" class="py-3 px-3 bg-white proj-text-primary w-full rounded-lg proj-border-primary border-2">
            清除
          </button>
        </div>
        <div class="w-1/2 p-2">
          <button type="button" @click.prevent="getStrokes()" class="py-3 px-3 proj-bg-Gradient text-white w-full rounded-lg proj-border-primary border-2">
            建立簽名
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import VueDrawingCanvas from "vue-drawing-canvas"
import bus from '@/bus'
export default {
  name: "CanvasModule",
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
      let URL = window.URL
      this.watermark = {
        type: "Image",
        source: URL.createObjectURL(event.target.files[0]),
        x: 0,
        y: 0,
        imageStyle: {
          width: 600,
          height: 400,
        },
      }
      await this.$refs.VueCanvasDrawing.redraw()
      this.isFile = true
    },
    getCoordinate (event) {
      let coordinates = this.$refs.VueCanvasDrawing.getCoordinates(event)
      this.x = coordinates.x
      this.y = coordinates.y
    },
    getStrokes () {
      localStorage.setItem("vue-drawing-canvas", JSON.stringify(this.$refs.VueCanvasDrawing.getAllStrokes()))
      localStorage.setItem("vue-canvas", this.image)

      let signArr
      if (localStorage.getItem('vue-canvas-array')) {
        signArr = JSON.parse(localStorage.getItem('vue-canvas-array'))
        signArr.push(this.image)
      } else {
        signArr = [this.image]
      }
      localStorage.setItem("vue-canvas-array", JSON.stringify(signArr))

      this.$emit('setStep', 1)

      bus.emit('reloadSign')
    },
    removeSavedStrokes() {
      window.localStorage.removeItem("vue-drawing-canvas")

      this.$refs.VueCanvasDrawing.reset()
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