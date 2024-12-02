import { App } from "vue";
/*
 * Made Cha66
 * 안드로이드 물리키 핸들링 처리
 * Ts Migration Platina78
 */

import {
  getRouterParamArrFromUrl,
  getRouterParamFromUrl,
} from "@/common/utils/util";
import { ErrorCode, AppError } from "../models/error";
import { native } from "@/common/utils/flutter_native";
import { Fn } from "../models/common";

export interface StackEvent extends Event {
  name: string;
  detail?: string;
  params?: any;
  query?: any;
}

let currentRouteName = "";
let stack: any[] = [];
let vm: any;
let isBlock = false;
let callback = () => {};

window.addEventListener("pushStackEvent", (value) => {
  console.log(value);
  stack[stack.length - 1] = (value as StackEvent).detail;
});

//next을 거치지 않으면 스택을 팝할 필요가 있다.
window.addEventListener("popStackEvent", (value) => {
  console.log(value);
  stack.pop();
});

//안드로이드 백
window.addEventListener("appRouterBack", (value) => {
  back();
});

window.addEventListener("getStack", (value) => {
  console.log("스택 :: ", getStack());
});

// ! MUST app.vue 에서 합시다!!
/*
 * @param vueObj VueObject Object
  *  defaultCallBack Function
  ? defaulCallBack Android Stack에 하나만 존재할 경우 호출
*/
const init = (vueObj: App, defaultCallback: Fn) => {
  vm = vueObj;
  callback = defaultCallback;
  stack.push({ name: vm.$route.name });
  window.addEventListener("androidBack", () => {
    if (isBlock === false) {
      if (vm.$route.name == currentRouteName) {
        vm.$emitter.emit("androidBack", null);
      } else {
        back();
      }
    }
  });
};

/*
  ? 물리키 블록 처리
*/
const block = () => {
  isBlock = true;
};

/*
  ? 물리키 블록 해제
*/
const unBlock = () => {
  isBlock = false;
};

/*
  * @params callFunc
  ? 물리키 콜백 등록
*/
const on = (callFunc: Fn) => {
  currentRouteName = vm.$route.name;
  vm.$emitter.off("androidBack");
  vm.$emitter.on("androidBack", () => {
    callFunc();
  });
};

/*
  ? 물리키 콜백 해제
*/
const off = () => {
  currentRouteName = "";
  vm.$emitter.off("androidBack");
};

/*
  ? Stack Push을 합니다.
  ? @params Object{name : String , params : Object<T>, query : Object<T>}
*/
const push = async ({ name, params, query }: StackEvent) => {
  try {
    stack.push({
      name,
      params,
      query,
    });
    await vm.$router.push({ name, params, query });
    native.basic.setCurrentPage(name);
  } catch (e) {
    if (stack[stack.length - 1].name === name) {
      stack.pop();
    }
    console.trace(e);
    throw new AppError(ErrorCode.NO_ROUTE_NAME);
  }
};

/*
  ? Stack 쿼리스트링과 같이 Push을 합니다.
  ? params url String
  ? Ex . [1,2,3] > [1,2,3,4]
  * Notice Named 접미사가 붙는 경우 전부 쿼리스트링 방식으로 처리가 가능합니다. (플러터 GetX에서 영감을 받음)
*/
const pushNamed = async (url: string) => {
  const routerParam = getRouterParamFromUrl(url) as StackEvent;
  await push(routerParam);
};

/*
  ? Stack 쿼리스트링과 같이 Push을 합니다.
  ? params url String
  ? Ex . [1,2,3] > [1,2,3,4]
  * Notice Named 접미사가 붙는 경우 전부 쿼리스트링 방식으로 처리가 가능합니다. (플러터 GetX에서 영감을 받음)
*/
const replace = async ({ name, params, query }: StackEvent) => {
  try {
    stack[stack.length - 1] = {
      name,
      params,
      query,
    };
    await vm.$router.replace({ name, params, query });

    native.basic.setCurrentPage(name);
  } catch (e) {
    if (stack[stack.length - 1].name === name) {
      stack.pop();
    }
    console.trace(e);
    throw new AppError(ErrorCode.NO_ROUTE_NAME);
  }
};

/*
  ? Stack Replace을 합니다.
  ? Ex . [1,2,3] > [1,2,4?name=home]
  * location.replace와 같은 역할을 합니다.(참고 : https://developer.mozilla.org/en-US/docs/Web/API/Location/replace)
  * Notice Named 접미사가 붙는 경우 전부 쿼리스트링 방식으로 처리가 가능합니다. (플러터 GetX에서 영감을 받음)
*/
const replaceNamed = async (url: string) => {
  const routerParam: StackEvent = getRouterParamFromUrl(url) as StackEvent;
  await replace(routerParam);
};

/*
  ? Stack을 전부 비우고 해당 페이지로 이동 합니다.
  ? @params Object{name : String , params : Object<T>, query : Object<T>}
  
  ? Ex . [1,2,3] > [4]
*/
const clearAndPush = async ({ name, params, query }: StackEvent) => {
  stack = [];
  await push({ name, params, query } as StackEvent);
};

/*
  ? Stack을 전부 비우고 해당 페이지로 이동 합니다.
  ? @params url String
  ? Ex . [1,2,3] > [4?name=home]
  * Notice Named 접미사가 붙는 경우 전부 쿼리스트링 방식으로 처리가 가능합니다. (플러터 GetX에서 영감을 받음)
*/
const clearAndPushNamed = async (url: string) => {
  const routerParam = getRouterParamFromUrl(url) as StackEvent;
  await clearAndPush(routerParam);
};

/*
  ? Stack을 넘겨준 배열 형식으로 설정합니다.
  * @params arr Array
  ? Ex . [1,2,3] > [4,5,8]
*/
const setStack = async (arr: Array<StackEvent>) => {
  stack = [];
  for (let i = 0; i < arr.length; i++) {
    await push(arr[i]);
  }
};

/*
  ? Stack을 넘겨준 배열 형식으로 설정합니다.
  * @params arr Array
  ? Ex . [1,2,3] > [4,5,8?name=home]
  * Notice Named 접미사가 붙는 경우 전부 쿼리스트링 방식으로 처리가 가능합니다. (플러터 GetX에서 영감을 받음)
*/
const setStackNamed = async (url: string) => {
  const routeParams = getRouterParamArrFromUrl(url) as Array<StackEvent>;
  await setStack(routeParams);
};

/*
  ? Stack pop을 합니다.
  ? Ex . [1,2,3] > [1,2]
*/
const back = async () => {
  if (stack.length == 1) {
    callback();
  } else {
    await vm.$router.go(-1);
    stack.pop();
    native.basic.setCurrentPage(stack[stack.length - 1].name);
  }
};

/*
  ? 넘긴 파라미터만큼 Stack을 pop합니다.
  ? @params name String required
  ? Ex . param {5}  > [1,5,2,3] > [1,5]
*/
const backTo = async (name: string) => {
  if (stack.length == 1) {
    console.error("뒤로 못 갑니다 ^^");
  } else {
    if (stack.filter((obj) => obj.name === name).length != 0) {
      let count = 0;
      while (stack.pop()) {
        count++;
        if (stack[stack.length - 1].name === name) break;
      }
      await vm.$router.go(-1 * count);
      native.basic.setCurrentPage(name);
    } else {
      console.error("너가 가려는 그 곳은 없단다 ^^");
      throw new AppError(ErrorCode.NO_ROUTE_NAME);
    }
  }
};

const getStackStr = () => {
  return stack.map((e) => toStr(e)).join("/");
};
const getStack = () => {
  return stack;
};

const toStr = (routeParam: StackEvent) => {
  return (
    routeParam.name +
    (routeParam.query
      ? "?" +
        Object.entries(routeParam.query)
          .map((e) => e[0] + "=" + e[1])
          .join("&")
      : "")
  );
};

const setStackAndLastPush = async (arr: Array<StackEvent>) => {
  stack = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const stackItem = arr[i];
    stack.push({
      name: stackItem.name,
      params: stackItem.params,
      query: stackItem.query,
    });
  }
  const lastStackItem = arr[arr.length - 1];
  await push(lastStackItem);
};

export const AppRouterType = {
  push,
  pushNamed,
  replace,
  replaceNamed,
  clearAndPush,
  clearAndPushNamed,
  setStack,
  setStackNamed,
  setStackAndLastPush,
  back,
  backTo,
  getStackStr,
  getStack,
};

export const AndroidBackType = {
  init,
  on,
  off,
  block,
  unBlock,
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$appRouter = {
      push,
      pushNamed,
      replace,
      replaceNamed,
      clearAndPush,
      clearAndPushNamed,
      setStackAndLastPush,
      setStack,
      setStackNamed,
      back,
      backTo,
      getStackStr,
      getStack,
    };
    app.config.globalProperties.$androidBack = {
      init,
      on,
      off,
      block,
      unBlock,
    };
  },
};
