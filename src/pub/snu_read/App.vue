<template>
  <router-view />
  <customAlert />
</template>
<script>
export default {
  created() {
    this.$androidBack.init(this, () => {
      alert("뒤로 갈수 없어요!");
    });
  },
};
</script>
<style lang="scss">
@use "./assets/scss";
</style>
