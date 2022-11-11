<template>
  <div class="main h-full min-h-screen">
    <div class="header w-full flex justify-between items-center proj-bg-primary py-1">
      <router-link :to="{ name: 'home' }" class="inline-block p-4"><i class="fa-solid fa-chevron-left text-white text-lg"></i></router-link>
      <div class="wrap w-1/3">
        <div class="search flex items-center">
          <button type="submit" class="searchButton">
            <img src="@/assets/img/Union.png" class="car object-contain mx-auto" />
          </button>
          <input type="text" class="searchTerm" placeholder="輸入關鍵字...">
        </div>
      </div>
      <div class="hidden md:block"></div>
    </div>

    <div class="max-w-4xl mx-auto py-8 px-4">
      <div class="mb-5">
        <h6 class="mb-3 font-semibold">2022</h6>
        <div class="flex flex-wrap w-full">
          <router-link :to="{ name: 'PdfListHistory' }" class="bg-white p-3 py-6 shadow-lg w-full flex justify-between mb-3 rounded-lg cursor-pointer" v-for="(item, idx) in filtered2022" :key="idx">
            <div class="flex-1">
              <p class="single-ellipsis title">
                <span class="mr-3">{{ returnDate(item.created_at) }}</span>
                <span class="proj-text-Gradient">{{ item.name }}</span>
              </p>
            </div>
            <div class="w-8"><i class="fa-solid fa-chevron-right proj-text-gray"></i></div>
          </router-link>
        </div>
      </div>
      <div>
        <h6 class="mb-3 font-semibold">2021</h6>
        <div class="flex flex-wrap w-full">
          <router-link :to="{ name: 'PdfListHistory' }" class="bg-white p-3 py-6 shadow-lg w-full flex justify-between mb-3 rounded-lg cursor-pointer" v-for="(item, idx) in filtered2021" :key="idx">
            <div class="flex-1">
              <p class="single-ellipsis title">
                <!-- <span class="mr-3">{{ moment(item.created_at).format('MM-DD') }}</span> -->
                <span class="mr-3">{{ returnDate(item.created_at) }}</span>
                <span class="proj-text-Gradient">{{ item.name }}</span>
              </p>
            </div>
            <div class="w-8"><i class="fa-solid fa-chevron-right proj-text-gray"></i></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { onMounted, ref, computed } from 'vue'
import  * as moment  from "moment"
import { useRouter } from 'vue-router'
export default {
  name: 'List',
  setup () {
    const router = useRouter()
    // const qaData0 = reactive([
    //   { id: 1001, el: '2021-10-20', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' },
    //   { id: 1002, created_at: '2021-10-21', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' },
    //   { id: 1003, created_at: '2022-10-22', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' },
    //   { id: 1004, created_at: '2022-10-22', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' },
    //   { id: 1005, created_at: '2022-10-22', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' }
    // ])

    const qaData1 = ref('')
    onMounted(() => {
      init()
    })

    const returnDate = (date) => {
      return moment(date).format('MM-DD')
    }
    const filtered2022 = computed(() => {
      if (qaData1.value) {
        return qaData1.value.filter((el) => {
          // return moment(el.created_at).format('YYYY') === 2022
          return moment(el.created_at).format('YYYY') === '2022'
        })
      }
    })
    const filtered2021 = computed(() => {
      if (qaData1.value) {
        return qaData1.value.filter((el) => {
          // return moment(el.created_at).format('YYYY') === 2022
          return moment(el.created_at).format('YYYY') === '2021'
        })
      }
    })
    const init = () => {
      if (localStorage.getItem('pdf-arrayList')) {

        qaData1.value = JSON.parse(localStorage.getItem('pdf-arrayList'))
      }
      // if (localStorage.getItem('vue-canvas-array')) {
      //   qaData1.value = JSON.parse(localStorage.getItem('vue-canvas-array'))
      // }
      // let obj = [
      //   { name: '2022年平面醫用口罩定額徵收調查意願書', url: '', createdDate: '2022-11-11' },
      //   { name: '蝦皮通路合案', url: '', createdDate: '2022-11-11' },
      //   { name: '房屋租賃契約書', url: '', createdDate: '2022-11-11' },
      //   { name: '7-11快閃電合作案', url: '', createdDate: '2022-11-11' },
      //   { name: '包裝設計合作接案', url: '', createdDate: '2022-11-11' }
      // ]

      // localStorage.setItem("pdf-arrayList", JSON.stringify(obj))
    }

    const openPdf = () => {
      router.push({ name: 'PdfListHistory' })
    }
    return {
      // qaData0,
      qaData1,
      filtered2022,
      filtered2021,
      returnDate,
      openPdf
    }
  }
}
</script>
<style scoped lang="scss">
.main {
  background: rgba(240, 240, 240, 0.58);
}
.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border-right: none;
  padding: 5px;
  height: 30px;
  outline: none;
  color: #ffffff;
  background: transparent;
}

.searchTerm:focus{
  color: #00B4CC;
}

.searchButton {
  width: 40px;
  height: 36px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
}

.title {
  @media (max-width: 768px) {
    max-width: 80%;
  }
}
</style>
