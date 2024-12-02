<template>
  <Header title="페이지 제목" />

  <div class="contents-body">
    <a @click="$appRouter.push({ name: 'Practice' })">문제풀이</a>
  </div>

  <BottomNavBar :activeMenuIdx="1" />

  <!-- :noDrag="true" 속성 추가시 우측 상단에 x 버튼 생기고 드래그 이벤트 사용하지 않음 -->
  <BottomSheet ref="popup"> BottomSheet 내용 </BottomSheet>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import Header from "#/components/layout/Header.vue";
import BottomNavBar from "#/components/layout/BottomNavBar.vue";
import BottomSheet from "#/components/common/BottomSheet.vue";

export default {
  name: "Home",

  components: { Header, BottomNavBar, BottomSheet },
  setup() {
    const { proxy: vm } = getCurrentInstance();
    const name = ref("이름입니다");
    const isShowPopup = ref(true);

    // custom alert
    const sdfsdfsdfsdf = () => {
      vm.$customAlert.open({
        // title: "제목",
        message: "메시지입니다. 메시지입니다.",
        confirmBtnText: "확인 버튼명",
        cancelBtnText: "취소 버튼명",
        hideConfirmBtn: false, // 확인 버튼 숨김
        hideCancelBtn: false, // 취소 버튼 숨김
        alertClass: "", // .alert-wrap에 추가할 클래스명
        // 확인을 클릭했을 경우
        confirm: () => {},
        // 취소를 클릭했을 경우
        cancel: () => {},
      });
    };

    // bottom sheet
    const sdfsdfsdfsdfsdf = () => {
      vm.$refs.popup.open();
    };

    const closePopup = () => {
      isShowPopup.value = false;
    };

    return {
      name,
      isShowPopup,
      sdfsdfsdfsdf,
      sdfsdfsdfsdfsdf,
      closePopup,
    };
  },
};
</script>
