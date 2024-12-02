import { Dic } from "./../models/common";
import { getExportValues, getModuleName } from "./util";

const addModules = (
  modules: Dic<string>,
  requireContext: any,
  custom?: any
) => {
  if (custom) {
    const exportValues = getExportValues(requireContext);
    modules[custom.name] = { ...(modules[custom.name] ?? {}), ...exportValues };
  } else {
    for (const filePath in requireContext) {
      const exportValues = getExportValues(requireContext[filePath]);
      const moduleName = getModuleName(filePath);
      modules[moduleName] = { ...(modules[moduleName] ?? {}), ...exportValues };
    }
    console.log(modules);
  }
};

const basicImports = import.meta.glob("@/common/interceptors/*.ts", {
  eager: true,
});

const siteImports = import.meta.glob("~interceptors/*.ts", {
  eager: true,
});

console.log("hello", siteImports);

// const siteRequireContext = require.context(
//   `@/${process.env.VUE_APP_PROJECT_NAME}/interceptors`,
//   true,
//   /^.+\.js$/
// );

const interceptors: Dic<string> = {};

addModules(interceptors, basicImports);
addModules(interceptors, siteImports);

export { interceptors };
