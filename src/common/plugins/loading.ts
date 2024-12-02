import { App, Plugin } from "vue";
import loading from "@/common/components/Loading.vue";
import emitter from "../utils/emitter";

export const loadingPlugin = {
  on: (value: unknown) => {
    emitter.emit("loadingOn", value);
    return true;
  },
  off: () => {
    emitter.emit("loadingOff");
    return false;
  },
};

const Loading: Plugin = {
  install: (app: App, ...options) => {
    app.component("loading", loading);
    app.config.globalProperties.$loading = loadingPlugin;
  },
};


export default Loading

