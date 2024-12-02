<template>
  <div class="custom-alert" v-if="isShowAlert">
    <div class="alert-wrap" :class="alertClass" :style="alertWidth">
      <div class="alert-head" v-if="title">
        <span v-html="title"></span>
      </div>
      <div class="alert-body" v-if="message || component">
        <component
          :is="component"
          :options="options.componentOptions"
          v-if="isComponent"
        />
        <div class="alert-body-text" v-html="message" v-else></div>
      </div>
      <div class="btn-wrap center" v-if="!isHideConfirmBtn || !isHideCancelBtn">
        <button
          type="button"
          class="btn cancel"
          @click="cancelAlert"
          v-if="!isHideCancelBtn"
        >
          {{ cancelBtnText }}
        </button>
        <button
          type="button"
          class="btn alert"
          @click="confirmAlert"
          v-if="!isHideConfirmBtn"
          :disabled="disabledConfirmBtn"
        >
          {{ confirmBtnText }}
        </button>
      </div>
      <div class="alert-close" v-if="title">
        <button type="button" class="btn-alert-close" @click="cancelAlert">
          <i class="fas fa-xmark"></i>
          <span class="blind">닫기</span>
        </button>
      </div>
    </div>
    <div class="alert-bg" @click="cancelAlert"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {},
      isShowAlert: false,
      title: "",
      message: "",
      isHideConfirmBtn: false,
      isHideCancelBtn: false,
      disabledConfirmBtn: false,
      alertClass: "",
    };
  },
  computed: {
    confirmBtnText() {
      return this.options.confirmBtnText
        ? this.options.confirmBtnText
        : this.$t("확인");
    },
    cancelBtnText() {
      return this.options.cancelBtnText
        ? this.options.cancelBtnText
        : this.$t("취소");
    },
    alertWidth() {
      return `width: ${this.options.alertWidth}`;
    },
    component() {
      return this.options.component;
    },
    isComponent() {
      return this.options.component ? true : false;
    },
  },
  methods: {
    confirmAlert() {
      this.closeAlert();
      if (this.options.confirm != undefined) {
        this.options?.confirm();
      }
    },
    cancelAlert() {
      this.closeAlert();
      if (this.options.cancel != undefined) {
        this.options?.cancel();
      }
    },
    closeAlert() {
      this.isShowAlert = false;
    },
    resetAlert() {
      this.options = {};
      this.isShowAlert = false;
      this.title = "";
      this.message = "";
      this.isHideConfirmBtn = false;
      this.isHideCancelBtn = false;
      this.disabledConfirmBtn = false;
      this.alertClass = "";
    },
  },
  created() {
    //22/07/27 추가 (있는데 없길래..)
    this.$emitter.on("customAlertClose", () => {
      this.closeAlert();
    });

    this.$emitter.on("customAlertOpen", (value) => {
      this.resetAlert();

      this.options = value;

      const options = this.options;

      // this.component = options.component;

      this.isShowAlert = options.isShowAlert;

      if (options.title) {
        // 메세지 제목
        this.title = options.title;
      }

      if (options.message) {
        // 메세지 내용
        this.message = options.message;
      }

      if (options.hideConfirmBtn) {
        // 확인 버튼 숨기기
        this.isHideConfirmBtn = options.hideConfirmBtn;
      }

      if (options.hideCancelBtn) {
        // 취소 버튼 숨기기
        this.isHideCancelBtn = options.hideCancelBtn;
      }

      if (options.disabledConfirmBtn) {
        // 확인 버튼 비활성화
        this.disabledConfirmBtn = options.disabledConfirmBtn;
      }

      if (options.alertClass) {
        // alert class명
        this.alertClass = options.alertClass;
      }
    });
  },
  mounted() {},
  beforeUnmount() {
    this.$emitter.off("customAlertOpen");
    this.$emitter.off("onOffConfrimBtn");
  },
};
</script>
