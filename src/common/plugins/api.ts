import { getExportValues, getModuleName } from "@/common/utils/util";
import { App, Plugin } from "vue";
import { Dic } from "../models/common";
//import { onionAxios } from "../utils/api";

const addModules = (
  modules: Dic<string>,
  requireContext: any,
  custom: boolean = false
) => {
  if (custom) {
    const exportValues = getExportValues(requireContext);
    modules["custom"] = exportValues;
  } else {
    for (const filePath in requireContext) {
      const exportValues = getExportValues(requireContext[filePath]);
      const moduleName = getModuleName(filePath);
      console.log(moduleName);
      console.log(exportValues);
      modules[moduleName] = exportValues;
    }
  }
};
// const basicRequireContext = require.context(`@/common/api/`, true, /^.+\.js$/);

const basicImports = import.meta.glob("@/common/api/*.ts", {
  eager: true,
});

const siteImports = import.meta.glob("~api/*.ts", {
  eager: true,
});

const api: Dic<string> = {};

const result: Dic<string> = {};

addModules(api, basicImports);
addModules(api, siteImports);

Object.keys(api).forEach((handlerName) => {
  result[handlerName] = {};
  Object.keys(api[handlerName]).forEach((funcName) => {
    result[handlerName][funcName] = (...args: any) =>
      api[handlerName][funcName](...args);
  });
});

const ApiPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$api = api as any;
  },
};

export default ApiPlugin;
