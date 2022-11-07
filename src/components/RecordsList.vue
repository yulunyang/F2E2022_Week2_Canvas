<template>
  <div>
    <div class="header w-full flex justify-between items-center proj-bg-primary py-1">
      <a href="" class="inline-block p-4"><i class="fa-solid fa-chevron-left text-white text-lg"></i></a>
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
      <h6 class="mb-3 font-semibold">2022</h6>
      <div class="flex flex-wrap w-full">
        <a class="bg-white p-3 py-5 shadow-lg w-full flex justify-between mb-3 rounded-lg" v-for="(item, idx) in qaData0" :key="idx">
          <div class="flex-1">
            <p class="single-ellipsis title"><span class="mr-3">11/05</span><span class="proj-text-Gradient">{{ item.name }}</span></p>
          </div>
          <div class="w-8"><i class="fa-solid fa-chevron-right proj-text-gray"></i></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { onMounted, reactive, ref } from 'vue'
export default {
  name: 'upload',
  setup () {
    const qaData0 = reactive([
      { id: 1001, created_at: '2021-10-20 00:00:00', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' },
      { id: 1002, created_at: '2021-10-21 00:00:00', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' },
      { id: 1003, created_at: '2022-10-22 00:00:00', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' },
      { id: 1004, created_at: '2022-10-22 00:00:00', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' },
      { id: 1005, created_at: '2022-10-22 00:00:00', name: '2022年平面醫用口罩定額徵收調查意願書', fileUrl: '/Test.paragraph.pdf' }
    ])
    onMounted(() => {
    })

    return {
      qaData0
    }
  }
}
</script>
<style scoped lang="scss">

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
