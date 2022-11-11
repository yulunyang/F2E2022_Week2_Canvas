<template>
  <div class='home p-0 m-o'>
    <HeaderSection :step="step" :isLoading="isLoading" @backStepFirst="step = 0" />

    <LoadingUploadModule v-if="isLoading" />
    <LoadingSignModule v-if="isLoadingSign" />
    <!-- <ChackLeaving v-if="isLeaving" /> -->
    <WarningAlert v-if="isWarning" :isWarningText="isWarningText" @closeWarning="closeWarning" />

    <Upload v-show="step === 0" @nextStep="nextStep" @showWarning="isFileOverAlert"  />
    <Sign v-show="step === 1" @setStep2="setStep2" />
    <PdfShow v-show="step === 2" @finishSign="finishSign" />
    <DownloadStatus v-show="step === 3" @backIndex="backIndex" />
  </div>
</template>

<script>
/* eslint-disable */
import HeaderSection from '@/components/modules/headerSection.vue'
import LoadingUploadModule from '@/components/modules/LoadingUploadModule.vue'
import LoadingSignModule from '@/components/modules/LoadingSignModule.vue'
// import ChackLeaving from '@/components/modules/warningAlert.vue'
import WarningAlert from '@/components/modules/warningAlert.vue'
import Upload from '@/components/Upload.vue'
import Sign from '@/components/Sign.vue'
import PdfShow from '@/components/pdfShow.vue'
import DownloadStatus from '@/components/downloadStatus.vue'
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
export default {
  name: 'HomeView',
  components: {
    HeaderSection,
    LoadingUploadModule,
    LoadingSignModule,
    Sign,
    Upload,
    PdfShow,
    DownloadStatus,
    WarningAlert
  },
  setup () {
    const isLoading = ref(false)
    const isLoadingSign = ref(false)
    const isLeaving = ref(false)
    const isWarning = ref(false)
    const isWarningText = ref('')
    const step = ref(2)
    const timer = ref(null)
    onMounted(() => {
    })
    onBeforeRouteLeave((to, from) => {
      if (step.value === 2) {
        const answer = window.confirm(
          'Do you really want to leave? you have unsaved changes!'
        )
        if (!answer) return false
      }
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
      backIndex
    }
  }
}
</script>

<style scoped lang="scss">

</style>
