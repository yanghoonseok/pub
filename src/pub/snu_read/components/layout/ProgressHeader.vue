<template>
  <div class="progress-head">
    <div class="head-container">
      <a @click="$appRouter.back()" class="btn-prev">
        <span class="blind">이전</span>
      </a>

      <div class="head-option">
        <div class="progress-fraction">{{ currentNum }} / {{ totalNum }}</div>

        <button type="button" class="btn-head" @click="handleSkip">
          <span>건너뛰기</span>
          <i class="far fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <div class="progress-bar">
      <div :style="{ width: barWidth }"></div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import { useRoute } from "vue-router";

export default {
  props: {
    currentNum: {
      type: Number,
      required: false,
    },
    totalNum: {
      type: Number,
      required: false,
    },
  },
  computed: {
    barWidth() {
      return (this.currentNum / this.totalNum) * 100 + "%";
    },
  },
  setup() {
    const route = useRoute();
    const { proxy: vm } = getCurrentInstance();

    const handleSkip = () => {
      if (route.name === "Practice") {
        vm.$appRouter.push({ name: "Practice2" });
      }
      if (route.name === "Practice2") {
        vm.$appRouter.push({ name: "Practice" });
      }
    };

    return {
      handleSkip,
    };
  },
};
</script>
