<template>
  <div class='home p-0 m-o'>
    <checkRecords v-if="!isData" />
    <RecordsList v-else />
  </div>
</template>

<script>
/* eslint-disable */
import checkRecords from '@/components/modules/checkRecords.vue'
import RecordsList from '@/components/RecordsList.vue'

import { onMounted, ref } from 'vue'
export default {
  name: 'HomeView',
  components: {
    checkRecords,
    RecordsList
  },
  setup () {
    const isData = ref(true)
    onMounted(() => {
    })
    return {
      isData
    }
  }
}
</script>

<style scoped lang="scss">

</style>
