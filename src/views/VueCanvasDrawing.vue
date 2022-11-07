<template>
<div>
  <CanvasModule v-if="step === 0" v-on:setStep="setStep" />

  <Fabric v-if="step === 1" v-on:setStep="setStep" />
</div>
</template>

<script>
import CanvasModule from "@/components/CanvasModule.vue"
import Fabric from "@/components/Fabric.vue"

export default {
  name: "ServeDev",
  components: {
    CanvasModule,
    Fabric
  },
  data () {
    return {
      step: 0
    };
  },
  methods: {
    setStep (setStep) {
      this.step = setStep
    }
  },
};
</script>

<style scoped>

</style>