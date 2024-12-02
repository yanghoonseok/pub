import { fileURLToPath } from "url";
import { getOs, getExportValues, getModuleName } from "@/common/utils/util";
import { Os, Dic } from "../models/common";

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
      modules[moduleName] = exportValues;
    }
    console.log(modules);
  }
};

const basicImports: any = import.meta.glob("@/common/native/*.ts", {
  eager: true,
});

const siteImports: any = import.meta.glob("~native/*.ts", {
  eager: true,
});

/*
const basicRequireContext = require.context(
  `@/common/native/`,
  true,
  /^.+\.js$/
);

*/
//2022-06-27 추가 김예강
// const requireContext = require.context(
//   `@/${process.env.VUE_APP_PROJECT_NAME}/native/`,
//   true,
//   /^.+\.js$/
// );

const natives: Dic<string> = {};

addModules(natives, basicImports);
addModules(natives, siteImports);

console.log(siteImports);

const native: any = {};

// @ts-ignore
const os = window.flutter_inappwebview ? getOs() : Os.PC;

if ([Os.ANDROID, Os.iOS].includes(os)) {
  console.info("flutter setting ");
  // @ts-ignore
  // console.info(window.flutter_inappwebview);
  Object.keys(natives).forEach((handlerName) => {
    native[handlerName] = {};
    Object.keys(natives[handlerName]).forEach((funcName) => {
      native[handlerName][funcName] = (...args: any) =>
        // @ts-ignore
        window.flutter_inappwebview.callHandler(funcName, ...args);
    });
  });
} else {
  Object.keys(natives).forEach((handlerName) => {
    native[handlerName] = {};
    Object.keys(natives[handlerName]).forEach((funcName) => {
      native[handlerName][funcName] = (...args: any) =>
        new Promise((resolve, reject) => {
          resolve(natives[handlerName][funcName](...args));
        });
    });
  });
}

export { native };
