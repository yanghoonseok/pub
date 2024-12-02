<template>
  <div class="navigation-bar">
    <a
      @click="$appRouter.clearAndPush({ name: 'Voca' })"
      class="menu-voca"
      :class="{ on: activeMenuIdx === 1 }"
    >
      <span class="blind">어휘</span>
    </a>
    <a
      @click="$appRouter.clearAndPush({ name: 'Grammar' })"
      class="menu-grammar"
      :class="{ on: activeMenuIdx === 2 }"
    >
      <span class="blind">문법</span>
    </a>
    <a
      @click="$appRouter.clearAndPush({ name: 'MyPage' })"
      class="menu-mypage"
      :class="{ on: activeMenuIdx === 3 }"
    >
      <span class="blind">마이페이지</span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    activeMenuIdx: {
      type: Number,
      required: true,
    },
  },
};
</script>
