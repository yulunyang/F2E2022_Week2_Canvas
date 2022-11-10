<!-- eslint-disable vue/require-prop-type-constructor -->
<template>
  <header class="fixed w-full top-0 left-0 z-50">
    <div class="mx-auto py-4 px-6 md:px-28 lg:px-8 lg:pr-36">
      <div class="flex justify-between w-full items-end lg:items-center">
        <div class="flex items-center">
          <a @click="backStepFirst" class="block px-3 cursor-pointer "><img src="@/assets/img/logo.png" alt="" class="object-contain block"></a>
        </div>
        <div class="flex items-center" v-if="step === 0 || isLoading">
          <router-link :to="{ name: 'records' }" class="pt-2 lg:py-2 px-5 inline-block items-center justify-center button cursor-pointer rounded-3xl border-2">歷史記錄</router-link>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
// import { ref } from 'vue'
export default({
  props: {
    step: {
      type: Number,
      default: 0
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  setup (props, ctx) {
    const backStepFirst = () => {
      ctx.emit('backStepFirst')
    }

    return {
      backStepFirst
    }
  },
})
</script>

<style lang="scss" scoped>
header {
  .button {
    color: #1C8B6A;
    background: #FFFFFF;
    border-color: #1C8B6A;
    @media (max-width: 1023px) {
      color: #424242;
      background: transparent;
      border: none;
    }
  }
}
</style>
