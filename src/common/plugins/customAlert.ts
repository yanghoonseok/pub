import { Dic, Fn } from "./../models/common";
import customAlertComponent from "@/common/components/CustomAlert.vue";
import emitter from "@/common/utils/emitter";
import { App, Component, Plugin, VueElement } from "vue";

declare type customAlertOption = {
  options?: Dic<any> | any;
  isShowAlert: boolean;
  title?: string;
  message?: string;
  hideConfirmBtn?: boolean;
  hideCancelBtn?: boolean;
  disabledConfirmBtn?: boolean;
  confirmBtnText: string;
  cancelBtnText: string;
} & Partial<customModalType>;

type customModalType = customAlertType | customConfirmType | customPromptType;

interface customConfirmType {
  readonly type: "confirm";
  confirm: Fn;
  cancel: Fn;
}

interface customAlertType {
  readonly type: "alert";
}

interface customPromptType {
  readonly type: "prompt";
  component?: any;
  componentOptions?: any;
  confirm: Fn;
  cancel: Fn;
}

export const customAlertPlugin = {
  name: "customAlert",
  data() {
    return {
      options: {},
    };
  },
  open(obj: customAlertOption) {
    console.log("alert open");
    obj.isShowAlert = true;
    emitter.emit("customAlertOpen", obj);
  },
  close() {
    emitter.emit("customAlertClose");
  },
};

const customAlert: Plugin = {
  install(app: App, ...options) {
    app.component("customAlert", customAlertComponent);
    app.config.globalProperties.$customAlert = customAlertPlugin;
    // app.config.globalProperties.$customAlert = customAlertPlugin;
  },
};

export default customAlert;
