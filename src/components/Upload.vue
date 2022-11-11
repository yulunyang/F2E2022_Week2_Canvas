<template>
  <div class='Upload leafBg w-screen h-screen bg-white flex items-center justify-center overflow-hidden relative'>
    <div class="index_upload flex w-full relative">
      <div class="left w-1/2  flex-col hidden lg:block">
        <div class="w-5/12">
          <p class="py-4 text-xl text-white px-3 title text-center">免費試用版</p>
        </div>
        <div class="flex-1 pt-16 pl-12">
          <h3 class="text-5xl mb-4 title2 font-bold">小綠簽</h3>
          <p class="text-lg leading-relaxed font-semibold">護樹、永續、減碳的綠色生活<br/>
            響應環保無紙化電子簽署，<br/>
            省時便利又環保。
            </p>
        </div>
      </div>
      <div class="right w-full lg:w-1/2 p-4 py-8 h-full flex justify-center lg:inline">
        <div class="bg-white upload_range flex flex-col items-center h-4/5 pt-10 w-full">
          <img src="@/assets/img/pdf.png" class="object-contain mx-auto mb-4" />
          <!-- <button class="upload_file_btn mb-4 text-white px-16 py-4">選擇檔案</button> -->
          <div class="file-upload cursor-pointer">
            <label for="upload" class="file-upload__label mb-4 px-16 py-4 cursor-pointer" accept="application/pdf">選擇檔案</label>
            <input id="upload" class="file-upload__input" type="file" name="file-upload" @change="checkFile($event)" >
          </div>
          <p class="drap mb-4">或拖移檔案到此處</p>
          <p class="text-sm note">(限10MB 內的PDF或JPG檔)</p>
        </div>
      </div>

      <div class="peoples absolute h-auto">
        <img src="@/assets/img/bg2.png" class="object-contain absolute bg2" />
        <img src="@/assets/img/p1.png" class="object-contain absolute p1 hidden lg:block" />
        <img src="@/assets/img/p2.png" class="object-contain absolute p2" />
        <img src="@/assets/img/p3.png" class="object-contain absolute p3" />
        <img src="@/assets/img/p4.png" class="object-contain absolute p4" />
        <img src="@/assets/img/tree.png" class="object-contain absolute tree" />
        <img src="@/assets/img/bag.png" class="object-contain absolute bag" />
      </div>
    </div>

    <div class="upload_footer w-full text-center md:text-right absolute bottom-4 left-50 md:right-4 text-xs">
      <p>小綠簽 © Code: Alex  /  Design: KT</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { onMounted } from 'vue'
import { useStore } from "vuex"
import bus from '@/bus'
export default {
  name: 'upload',
  components: {
    bus
  },
  setup (props, ctx) {
    const store = useStore()
    onMounted(() => {
    })
    const checkFile = (e) => {
      const fileSize = e.target.files[0].size / 1024 / 1024

      if (e.target.files[0].type.indexOf('pdf') > 0) {
        if (fileSize < 10) {
          console.log(e.target.files[0])
          bus.emit('fileUpload', e.target.files[0])

          ctx.emit('nextStep')

          e.target.value = ''
        } else {
          ctx.emit('showWarning', '檔案超過10MB，請重新選擇')
        }
      } else {
        ctx.emit('showWarning', '檔案格式錯誤，請重新選擇')
      }

    }

    return {
      checkFile,
      store
    }
  }
}
</script>
<style scoped lang="scss">
.leafBg {
  background-image: url('@/assets/img/leaf1.png'), url('@/assets/img/leaf2.png');
  background-position: left bottom, right top;
  background-repeat: no-repeat;
  @media (max-width: 1023px) {
    background-image: none;
    // padding-top: 90px;
  }
}
.index_upload{
  background: rgba(240, 240, 240, 0.58);
  border-radius: 34px;
  height: 100%;
  max-height: 558px;
  max-width: 1040px;
  @media (max-width: 1023px) {
    max-height: 100vh;
    border-radius: 0;
  }
  .left {
    .title {
      background: linear-gradient(180deg, #35A483 0%, #077854 100%);
      border-radius: 34px 0px;
    }
    .title2 {
      background: linear-gradient(180deg, #35A483 0%, #077854 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

  }
  .right {
    @media(max-width: 1023px) {
      padding-top: 90px;
    }
    .upload_range {
      background: #FFFFFF;
      border: 2px dashed #B7B7B7;
      border-radius: 26px;
      max-width: 417px;
      @media (max-width: 1023px) {
        max-width: 547px;
        max-height: 567px;
      }
    }
    .upload_file_btn {
      background: linear-gradient(180deg, #35A483 0%, #077854 100%);
      box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.11);
      border-radius: 16px;
    }
    .drap {
      color: #424242;
    }
    .note {
      background: linear-gradient(180deg, #35A483 0%, #077854 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

  }

  .peoples {
    width: 670px;
    right: 0;
    bottom: -2em;
    .bg2 {
      bottom: 0;
    }
    .p1 {
      bottom: 8em;
      right: 2%;
    }
    .p2 {
      bottom: 3rem;
      left: 0;
    }
    .p3 {
      bottom: 2.5rem;
      left: 42%;
    }
    .p4 {
      bottom: 3.6rem;
      left: 66%;
    }
    .tree {
      bottom: 3rem;
      left: 58%;
    }
    .bag {
      bottom: 2rem;
      left: 66%;
    }
  }
  @media (max-width: 1023px) {
    .peoples {
      width: 670px;
      left: 50%;
      bottom: 2em;
      transform: translateX(-50%);
      .bg2 {
        bottom: 0;
      }
      .p1 {
        bottom: 8em;
        right: 2%;
      }
      .p2 {
        bottom: 3rem;
        left: 5%;
      }
      .p3 {
        bottom: 2.5rem;
        left: 42%;
      }
      .p4 {
        bottom: 3.6rem;
        left: 66%;
      }
      .tree {
        bottom: 3rem;
        left: 58%;
      }
      .bag {
        bottom: 2rem;
        left: 66%;
      }
    }
  }
  @media (max-width: 375px) {
    .peoples {
      width: 375px;
      left: 50%;
      bottom: 2em;
      transform: translateX(-50%);
      .bg2 {
        bottom: 0;
      }
      .p1 {
        bottom: 8em;
        right: 2%;
      }
      .p2 {
        bottom: 1.5rem;
        left: 2%;
        width: 142px;
      }
      .p3 {
        bottom: 1.5rem;
        left: 35%;
        width: 97px;
      }
      .p4 {
        bottom: 2rem;
        left: 66%;
        width: 108px;
      }
      .tree {
        bottom: 2rem;
        left: 58%;
        width: 76px;
      }
      .bag {
        bottom: 1rem;
        left: 70%;
      }
    }
  }
}

.file-upload {
	position: relative;
	display: inline-block;
}

.file-upload__label {
  display: block;
  padding: 1em 2em;
  color: #fff;
  background: linear-gradient(180deg, #35A483 0%, #077854 100%);
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.11);
  border-radius: 16px;
  border-radius: .4em;
}

.file-upload__input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 1;
    width:0;
    height: 100%;
    opacity: 0;
}
</style>
