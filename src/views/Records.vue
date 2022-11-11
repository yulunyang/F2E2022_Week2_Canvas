<template>
  <div class='home p-0 m-o'>
    <RecordsList v-if="isData" />

    <NoRecords v-if="!isData" />
  </div>
</template>

<script>
/* eslint-disable */
import NoRecords from '@/components/records/NoRecords.vue'
import RecordsList from '@/components/records/RecordsList.vue'

import { onMounted, ref } from 'vue'
export default {
  name: 'Records',
  components: {
    NoRecords,
    RecordsList
  },
  setup () {
    const isData = ref(false)
    onMounted(() => {
      init()
    })

    const init = () => {
      if (localStorage.getItem('pdf-arrayList')) {
        isData.value = true
      } else {
        isData.value = false
      }

      // let obj = [
      //   { name: '2022年平面醫用口罩定額徵收調查意願書', url: '/test.pdf', created_at: '2022-11-11' },
      //   { name: '蝦皮通路合案', url: '/test.pdf', created_at: '2021-10-30' },
      //   { name: '房屋租賃契約書', url: '/test.pdf', created_at: '2021-04-26' },
      //   { name: '7-11快閃電合作案', url: '/test.pdf', created_at: '2021-02-05' },
      //   { name: '包裝設計合作接案', url: '/test.pdf', created_at: '2021-01-27' }
      // ]

      // localStorage.setItem("pdf-arrayList", JSON.stringify(obj))
    }

    return {
      isData,
      init
    }
  }
}
</script>

<style scoped lang="scss">

</style>
