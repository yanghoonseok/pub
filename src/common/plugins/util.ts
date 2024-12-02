import { Dic } from "./../models/common";
import * as utilFunc from "@/common/utils/util";
import { App } from "vue";

export default {
  install: (app: App) => {
    app.config.globalProperties.$util = utilFunc;
  },
};
