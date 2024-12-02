import emitter from "@/common/utils/emitter";
import { App, Plugin } from "vue";

const customEmitter: Plugin = {
  install: (app: App) => {
    app.config.globalProperties.$emitter = emitter;
  },
};

export default customEmitter;
