<template>
  <textarea v-model="inputValue" @keydown="onkeydown"></textarea>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default() {
        return "";
      },
    },
    maxLength: {
      type: Number,
      reuqired: true,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    onkeydown(evt) {
      if (this.modelValue.length > this.maxLength) {
        evt.preventDefault();
        return;
      }
    },
  },
};
</script>

<style></style>
