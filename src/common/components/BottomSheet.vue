<template>
  <div class="bottom-sheet" :class="{ on: isShowBottomSheet }">
    <div
      class="sheet-wrap"
      :style="{
        bottom: `${bottomSheetStyleBottom}px`,
      }"
      ref="bottomSheetWrap"
    >
      <slot />

      <div class="sheet-bar" @click="close">
        <div class="bar"></div>
      </div>
    </div>
    <div class="sheet-bg" @click="close" v-show="isShowBg"></div>
  </div>
</template>

<script>
import Hammer from "hammerjs";
import { getCurrentInstance, onMounted, ref } from "vue";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { isOpen } = props;

    const { proxy: vm } = getCurrentInstance();

    const isShowBottomSheet = ref(isOpen);
    const isShowBg = ref(isOpen);
    const bottomSheetStyleBottom = ref(0);
    const bottomSheetHeight = ref(0);

    const handleDrag = (e) => {
      if (e.deltaY > 0) {
        bottomSheetStyleBottom.value = -e.deltaY;
        if (e.isFinal) {
          if (e.deltaY < 60) {
            bottomSheetStyleBottom.value = 0;
          } else {
            close();
          }
        }
      }
    };

    const open = () => {
      bottomSheetStyleBottom.value = 0;
      isShowBottomSheet.value = true;
      isShowBg.value = true;
    };

    const close = () => {
      bottomSheetStyleBottom.value = -bottomSheetHeight.value;
      isShowBg.value = false;

      setTimeout(() => {
        isShowBottomSheet.value = false;
      }, 400);
    };

    onMounted(() => {
      const element = vm.$refs.bottomSheetWrap;
      const mc = new Hammer(element);
      mc.add(
        new Hammer.Pan({ direction: Hammer.DIRECTION_VERTICAL, threshold: 0 })
      );

      mc.on("pan", handleDrag);

      bottomSheetHeight.value = vm.$refs.bottomSheetWrap.clientHeight;
    });

    return {
      isShowBottomSheet,
      isShowBg,
      bottomSheetStyleBottom,
      open,
      close,
    };
  },
};
</script>
