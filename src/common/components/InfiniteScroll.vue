<template>
  <div v-if="!isLoading">
    <infinite-loading @infinite="infiniteHandler">
      <template #spinner>
        <div v-if="showLoading" class="loader"></div>
        <br v-else
      /></template>
      <template #no-more><br /></template>
      <template #no-result><br /></template>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  props: {
    getData: { type: Function, required: true },
    parameter: { type: Array, required: false },
    showLoading: { type: Boolean, default: true, required: false },
    optPageIndex: { type: Number, default: 1, required: false },
  },
  emits: ["setData"],
  data() {
    return {
      pageIndex: 1,
      time: 0,
      isLoading: false,
      stop: false,
    };
  },
  created() {
    this.pageIndex = this.optPageIndex;
  },
  components: {
    InfiniteLoading,
  },
  methods: {
    resetInfiniteScroll() {
      console.log("reset");
      this.pageIndex = 1;
      this.isLoading = true;
      this.stop = false;
      setTimeout(() => {
        this.isLoading = false;
      }, 100);
    },
    //인피니티 스크롤
    infiniteHandler($state) {
      this.getData(...(this.parameter ?? []), this.pageIndex)
        .then((data) => {
          setTimeout(() => {
            if (data.length / 10 < 1) {
              $state.complete();
              this.stop = true;
            }
            this.$emit("setData", data, this.pageIndex, this.stop);
            $state.loaded();
            this.pageIndex += 1;
            this.time = 1000;
          }, this.time);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
