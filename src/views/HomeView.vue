<template>
  <div class='home p-0 m-o'>
    <LoadingUploadModule v-if="isLoading" />
    <LoadingSignModule v-if="isLoadingSign" />
    <!-- <ChackLeaving v-if="isLeaving" /> -->
    <WarningAlert v-if="isWarning" :isWarningText="isWarningText" @closeWarning="closeWarning" />

    <Upload v-show="step === 0" @nextStep="nextStep" @showWarning="isFileOverAlert"  />
    <Sign v-show="step === 1" @setStep2="setStep2" />
    <pdfShow v-show="step === 2" @finishSign="finishSign" />
    <DownloadStatus v-show="step === 3" :isSuccess="downloadStatus" @backIndex="backIndex" />
  </div>
</template>

<script>
/* eslint-disable */

import LoadingUploadModule from '@/components/modules/LoadingUploadModule.vue'
import LoadingSignModule from '@/components/modules/LoadingSignModule.vue'
// import ChackLeaving from '@/components/modules/warningAlert.vue'
import WarningAlert from '@/components/modules/warningAlert.vue'
import Upload from '@/components/Upload.vue'
import Sign from '@/components/Sign.vue'
import pdfShow from '@/components/pdfShow.vue'
import DownloadStatus from '@/components/downloadStatus.vue'
import { onMounted, ref } from 'vue'

export default {
  name: 'HomeView',
  components: {
    LoadingUploadModule,
    LoadingSignModule,
    Sign,
    Upload,
    pdfShow,
    DownloadStatus,
    // ChackLeaving,
    WarningAlert
  },
  setup () {
    const isLoading = ref(false)
    const isLoadingSign = ref(false)
    const isLeaving = ref(false)
    const isWarning = ref(false)
    const downloadStatus = ref(true)
    const isWarningText = ref('')
    const step = ref(0)
    const timer = ref(null)
    onMounted(() => {
    })

    const isFileOverAlert = (isFileOverAlert) => {
      isWarning.value = true
      isWarningText.value = isFileOverAlert
    }

    const nextStep = () => {
      isLoading.value = true

      const timeout = setTimeout(() => {
        isLoading.value = false
        step.value = 1
      }, 2000)
      clearTimeout(timeout.value)
    }

    const setStep2 = () => {
      isLoadingSign.value = true

      const timeout = setTimeout(() => {
        isLoadingSign.value = false
        step.value = 2
      }, 2000)
      clearTimeout(timeout.value)
    }
    const finishSign = () => {
      step.value = 3
    }
    const closeWarning = (closeWarning) => {
      isWarning.value = false
      downloadStatus.value = closeWarning
    }

    const backIndex = () => {
      step.value = 0
    }
    return {
      isLoading,
      isLoadingSign,
      step,
      isLeaving,
      isWarning,
      isFileOverAlert,
      isWarningText,
      timer,
      nextStep,
      setStep2,
      closeWarning,
      finishSign,
      downloadStatus,
      backIndex
    }
  }
}
</script>

<style scoped lang="scss">

</style>
