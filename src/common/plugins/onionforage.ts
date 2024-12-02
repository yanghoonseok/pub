import { StringOrNumber } from "./../models/common";
import { App } from "vue";
import localforage from "localforage";

export const LocalForageType = {
  setItem: (key: StringOrNumber, value: any): Promise<void> =>
    localforage.setItem(key.toString(), value),
  getItem: (key: StringOrNumber): any => localforage.getItem(key.toString()),
};

export default LocalForageType;

export const onionForageType = {
  setItem: async (key: string, value: any): Promise<void> => {
    if (value instanceof Array) {
      // 배열일 경우 ??
      await localforage.setItem(key, JSON.parse(JSON.stringify(value)));
    } else {
      // 배열을 제외한 변수타입일 경우
      await localforage.setItem(key, value);
    }
  },
  getItem: (key: string): Promise<any> => localforage.getItem(key),
};

/*
  TODO 전처리 & 후처리 추가
*/
export const onionForage = {
  install: (app: App) => {
    localforage.config({
      name : import.meta.env.VUE_APP_PROJECT_NAME
    });
    app.config.globalProperties.$onionForage = onionForageType;
  },
};
