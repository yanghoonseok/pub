import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import mitter from "mitt";
import { createPinia } from "pinia";

import flutterNative from "@/common/plugins/flutter_native";
import localForage from "@/common/plugins/localforage";
import androidBack from "@/common/plugins/androidback";
import customMitt from "@/common/plugins/mitt";
import customAlert from "@/common/plugins/customAlert";
import loading from "@/common/plugins/loading";
import i18n from "@/common/plugins/i18n";

const emitter = mitter();

const pinia = createPinia();

const app = createApp(App)
  .use(router)
  .use(flutterNative)
  .use(localForage)
  .use(androidBack)
  .use(customMitt, emitter)
  .use(customAlert, emitter)
  .use(loading)
  .use(i18n)
  .use(pinia);

app.config.performance = true;

app.mount("#app");
