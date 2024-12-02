<template>
  <div
    v-if="loading"
    class="loader-wrap"
    :class="{ showbackground: options.showBackground }"
  >
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  data() {
    return { loading: false, options: {} };
  },
  created() {
    this.$emitter.on("loadingOn", (opt) => {
      this.loading = true;
      this.options = {
        showBackground: opt?.showBackground ?? false,
        onBlock: opt?.onBlock ?? false,
      };
      if (this.options.onBlock) {
        this.$androidBack.block();
      }
    });
    this.$emitter.on("loadingOff", () => {
      this.loading = false;
      this.showBackground = false;
      this.$androidBack.unBlock();
    });
  },
  beforeUnmount() {
    this.$emitter.off("loadingOn");
    this.$emitter.off("loadingOff");
  },
};
</script>
