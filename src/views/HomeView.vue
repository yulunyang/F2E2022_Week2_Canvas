<template>
  <div class='home p-0 m-o'>
    <HeaderSection :step="step" :isLoading="isLoading" @backStepFirst="step = 0" />

    <LoadingUploadModule v-if="isLoading" />
    <LoadingSignModule v-if="isLoadingSign" />
    <!-- <ChackLeaving v-if="isLeaving" /> -->
    <WarningAlert v-if="isWarning" :isWarningText="isWarningText" @closeWarning="closeWarning" />

    <Upload v-show="step === 0" @nextStep="nextStep" @showWarning="isFileOverAlert"  />
    <Sign v-if="step === 1" @setStep2="setStep2" />
    <PdfShow v-show="step === 2" @finishSign="finishSign" />
    <DownloadStatus v-if="step === 3" @backIndex="backIndex" />
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
import PdfShow from '@/components/PdfView3.vue'
// import PdfShow from '@/components/PdfViewT.vue'
import DownloadStatus from '@/components/downloadStatus.vue'
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import Swal from 'sweetalert2'

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
    const step = ref(0)

    const isLoading = ref(false)
    const isLoadingSign = ref(false)
    const isLeaving = ref(false)
    const isWarning = ref(false)
    const isWarningText = ref('')
    const timer = ref(null)
    onMounted(() => {
    })
    onBeforeRouteLeave((to, from) => {
      if (step.value === 2) {
        Swal.fire({
          title: '尚未儲存文件，確定要離開且刪除？',
          showCancelButton: true,
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          customClass: {
            popup: 'customClass-popup rounded-3xl py-6 w-auto px-5',
            title: 'customClass-title font-bold text-black pt-6 px-0',
            actions: 'btns',
            confirmButton: 'btn btn-confirm',
            cancelButton: 'btn btn-cancel',
          }
        }).then((result) => {
          if (!result.isConfirmed) {
            return false
          }
        })
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
    const finishSign = (finishSign) => {
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
