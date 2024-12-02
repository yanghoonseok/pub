<template>
  <div class="splash">
    <a @click="$appRouter.push({ name: 'Home' })">이동</a>
  </div>
</template>

<script>
import { getOs } from "@/common/utils/util";
export default {
  created() {
    document.getElementsByTagName("html")[0].classList.add(getOs());

    // 퍼블리싱 화면 보여주기용
    setTimeout(() => {
      this.$appRouter.replace({
        name: "Home",
      });
    }, 1500);
  },
};
</script>
