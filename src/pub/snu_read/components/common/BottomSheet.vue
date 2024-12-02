<template>
  <div class="bottom-sheet" :class="{ on: isSheetOpen }">
    <div
      class="sheet-wrap"
      :style="{
        transform: `translateY(${sheetBottom}px)`,
      }"
      ref="bottomSheetWrap"
    >
      <slot />

      <button type="button" class="sheet-close" @click="close" v-if="noDrag">
        <i class="far fa-times" aria-hidden="true"></i>
        <span class="blind">닫기</span>
      </button>
      <button type="button" class="sheet-bar" @click="close" v-else>
        <span class="bar"></span>
      </button>
    </div>
    <div class="sheet-bg" @click="close" v-show="isSheetOpen"></div>
  </div>
</template>

<script>
import Hammer from "hammerjs";
import { getCurrentInstance, onMounted, ref } from "vue";

export default {
  props: {
    noDrag: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { proxy: vm } = getCurrentInstance();
    const { noDrag } = props;

    const isSheetOpen = ref(false);
    const sheetBottom = ref(0);
    const sheetHeight = ref(0);

    const handleDrag = (e) => {
      if (e.deltaY > 0) {
        sheetBottom.value = e.deltaY;
        if (e.isFinal) {
          if (e.deltaY < 60) {
            sheetBottom.value = 0;
          } else {
            close();
          }
        }
      }
    };
    const open = () => {
      sheetBottom.value = 0;
      isSheetOpen.value = true;
    };

    const close = () => {
      sheetBottom.value = sheetHeight.value;

      setTimeout(() => {
        isSheetOpen.value = false;
      }, 300);
    };

    onMounted(() => {
      const element = vm.$refs.bottomSheetWrap;
      const elementHeight = element.getBoundingClientRect().height;

      if (!noDrag) {
        const mc = new Hammer(element);

        mc.add(
          new Hammer.Pan({ direction: Hammer.DIRECTION_VERTICAL, threshold: 0 })
        );

        mc.on("pan", handleDrag);
      }

      sheetBottom.value = elementHeight;
      sheetHeight.value = elementHeight;
    });

    return {
      isSheetOpen,
      sheetBottom,
      sheetHeight,
      open,
      close,
    };
  },
};
</script>
