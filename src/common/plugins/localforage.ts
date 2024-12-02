import { StringOrNumber } from "./../models/common";
import { App } from "vue";
import localforage from "localforage";

export const LocalForageType = {
  setItem: (key: StringOrNumber, value: any) =>
    localforage.setItem(key.toString(), value),
  getItem: (key: StringOrNumber) => localforage.getItem(key.toString()),
};

export default {
  install: (app: App) => {
    localforage.config({
      name: import.meta.env.VUE_APP_PROJECT_NAME,
    });
    app.config.globalProperties.$localforage = {
      setItem: (key: string, value: any) => localforage.setItem(key, value),
      getItem: (key: string) => localforage.getItem(key),
    };
  },
};
