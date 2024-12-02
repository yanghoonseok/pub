import mitter from "mitt";

import { LocalForageType } from "@/common/plugins/localforage";
import { AppRouterType, AndroidBackType } from "@/common/plugins/androidback";
import basic from "@/common/native/basic";
import bootpay from "@/common/native/bootpay";
import camera from "@/common/native/camera";
import dynamicLink from "@/common/native/dynamicLink";
import fcm from "@/common/native/fcm";
import snsLogin from "@/common/native/snsLogin";
import sound from "@/common/native/sound";
import alarm from "@/common/native/alarm";
import * as UtilType from "@/common/utils/util";

import * as aplctn from "@/common/api/aplctn";
import * as cntnts from "@/common/api/cntnts";
import * as member from "@/common/api/member";


import { customAlertPlugin } from "@/common/plugins/customAlert";

import * as customNative from `@/${import.meta.env.VUE_APP_PROJECT_NAME}/native`;

import * as customApi from `@/${import.meta.env.VUE_APP_PROJECT_NAME}/api`;

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

const mitt = mitter();

const custom: Record<string, any> = {...customNative};

const NativeType = {
  basic,
  bootpay,
  camera,
  dynamicLink,
  fcm,
  snsLogin,
  custom,
  sound,
  alarm,
};

const ApiType = {
  aplctn,
  cntnts,
  member,
  customApi
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $appRouter: typeof AppRouterType;
    $androidBack: typeof AndroidBackType;
    $localforage: typeof LocalForageType;
    $native: typeof NativeType;
    $emitter: typeof mitt;
    $util: typeof UtilType;
    $customAlert: typeof customAlertPlugin;
    $api : typeof ApiType;
  }
}
