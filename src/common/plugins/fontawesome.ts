import { App } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fat } from "@fortawesome/pro-thin-svg-icons";
import { fad } from "@fortawesome/pro-duotone-svg-icons";
import { fass } from "@fortawesome/sharp-solid-svg-icons";
import { fasr } from "@fortawesome/sharp-regular-svg-icons";
import { fasl } from "@fortawesome/sharp-light-svg-icons";

library.add(fas, far, fal, fat, fad, fass, fasr, fasl);

export default {
  install: (app: App) => {
    app.component("font-awesome-icon", FontAwesomeIcon);
  },
};
