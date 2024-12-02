<template>
  <div class="popup-head">
    <div class="popup-title">{{ title }}</div>

    <a @click="$appRouter.back()" class="btn-close">
      <i class="far fa-times" aria-hidden="true"></i>
      <span class="blind">닫기</span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
