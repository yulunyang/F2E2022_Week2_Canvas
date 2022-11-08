<template>
  <div class='home p-0 m-o'>
    <LoadingModule v-if="isLoading" />
    <Upload v-show="step === 0" />
    <Sign v-show="step === 1" />
    <pdfShow v-show="step === 2" />

    <DownloadStatus v-show="step === 3" />
  </div>
</template>

<script>
/* eslint-disable */

import LoadingModule from '@/components/modules/LoadingModule.vue'
import Upload from '@/components/Upload.vue'
import Sign from '@/components/Sign.vue'
import pdfShow from '@/components/pdfShow.vue'
import DownloadStatus from '@/components/downloadStatus.vue'
import { onMounted, ref } from 'vue'
export default {
  name: 'HomeView',
  components: {
    LoadingModule,
    Sign,
    Upload,
    pdfShow,
    DownloadStatus
  },
  setup () {
    const isLoading = ref(false)
    const step = ref(0)
    onMounted(() => {
    })
    return {
      isLoading,
      step
    }
  }
}
</script>

<style scoped lang="scss">

</style>
