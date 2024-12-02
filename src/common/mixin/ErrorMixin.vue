<script lang="ts">
import { ErrorParam } from '@/models/error';
export default {
  methods: {
    handleError({
      error,
      callbackObj,
      defaultCallback,
      basicText,
    }: ErrorParam) {
      console.log("handleError");
      console.log(error);
      console.error(error?.name);
      //어니언 에러면 code가 있기 때문에 그에 따른 callback 함수 설정 가능
      if (error?.name === "AppError") {
        console.error(error.code);
        if (error.message) {
          this.$customAlert.open({
            message: error.message,
            confirm: () => {
              if (callbackObj?.[error.code]) {
                callbackObj?.[error.code]();
              } else {
                if (defaultCallback) {
                  defaultCallback();
                }
              }
            },
            hideCancelBtn: true,
          });
        } else {
          if (callbackObj?.[error.code]) {
            callbackObj?.[error.code]();
          }
        }
      } else {
        if (error?.message) {
          this.$customAlert.open({
            message: basicText || error.message,
            confirm: () => {
              if (defaultCallback) {
                defaultCallback();
              }
            },
            hideCancelBtn: true,
          });
        } else {
          if (defaultCallback) {
            defaultCallback();
          }
        }
      }
    },
  },
};
</script>
