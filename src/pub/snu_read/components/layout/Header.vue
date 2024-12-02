<template>
  <!-- contents-head -->
  <div class="contents-head">
    <h1 class="logo">{{ title }}</h1>

    <div class="btn-right">
      <button type="button" class="btn-menu" @click="openAllMenu">
        <i class="fas fa-bars" aria-hidden="true"></i>
        <span class="blind">전체메뉴</span>
      </button>
    </div>
  </div>
  <!-- //contents-head -->

  <!-- 전체메뉴 -->
  <transition name="slide-left">
    <div class="all-menu" v-show="isAllMenuOpen">
      <div class="all-menu-wrap">전체메뉴 내용</div>

      <button type="button" class="btn-close" @click="closeAllMenu">
        <i class="far fa-times" aria-hidden="true"></i>
        <span class="blind">닫기</span>
      </button>
    </div>
  </transition>
  <!-- //전체메뉴 -->
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isAllMenuOpen = ref(false);

    const openAllMenu = () => {
      isAllMenuOpen.value = true;
      document.body.classList.add("hidden-scroll");
    };

    const closeAllMenu = () => {
      isAllMenuOpen.value = false;
      document.body.classList.remove("hidden-scroll");
    };

    return {
      isAllMenuOpen,
      openAllMenu,
      closeAllMenu,
    };
  },
};
</script>
