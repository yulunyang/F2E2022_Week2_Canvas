<template>
  <div class='home p-0 m-o'>
    <!-- <LoadingModule /> -->
    <!-- <checkRecords /> -->
    <Upload />
  </div>
</template>

<script>
/* eslint-disable */

// import LoadingModule from '@/components/modules/LoadingModule.vue'
// import checkRecords from '@/components/modules/checkRecords.vue'
import Upload from '@/components/Upload.vue'
import { onMounted } from 'vue'
export default {
  name: 'HomeView',
  components: {
    // LoadingModule,
    // checkRecords,
    Upload
  },
  setup () {
    onMounted(() => {
    })
    return {
    }
  }
}
</script>

<style scoped lang="scss">

</style>
