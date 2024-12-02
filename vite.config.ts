import { Plugin, PluginOption, defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import { fileURLToPath } from "url";
import dynamicImport from "vite-plugin-dynamic-import";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import VueDevTools from "vite-plugin-vue-devtools";
import zipPack from "vite-plugin-zip-pack";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  if (mode === "testing" || mode === "publish") {
    process.env.NODE_ENV = "local";
  } else if (mode === "development") {
    process.env.NODE_ENV = "development";
  } else {
    process.env.NODE_ENV = "production";
  }

  if (!fs.existsSync(`./results/${process.env.VUE_APP_PROJECT_NAME}/`)) {
    console.log("프로젝트 빌드 디렉터리를 생성합니다!");
    fs.mkdirSync(`./results/${process.env.VUE_APP_PROJECT_NAME}/`, {
      recursive: true,
    });
  }

  const isPublishMode = mode.includes("publish");

  if (!isPublishMode) {
    if (!fs.existsSync(`./results/${process.env.VUE_APP_PROJECT_NAME}_zip/`)) {
      console.log("프로젝트 압축 빌드 디렉터리를 생성합니다!");
      fs.mkdirSync(`./results/${process.env.VUE_APP_PROJECT_NAME}_zip/`);
    }
  }

  // console.log(fileURLToPath(new URL("./src", import.meta.url)))

  // console.log(process.env.NODE_ENV)
  const buildOption = {
    outDir: isPublishMode ? `./results` : `./results/assets`,
  };

  console.log(buildOption);

  const entryTarget = `<script type="module" src="/src/${process.env.VUE_APP_PROJECT_NAME}/main.ts"></script>`;

  const inejctList: Record<string, string> = {};
  if (process.env.VUE_APP_MAP_SCRIPT_SRC) {
    inejctList.mapScript = `<script type="text/javascript" src="${process.env.VUE_APP_MAP_SCRIPT_SRC}"></script>`;
  }

  console.log(inejctList);

  const getAssetDirs = fs
    .readdirSync(
      new URL(
        `./src/${process.env.VUE_APP_PROJECT_NAME}/assets/`,
        import.meta.url
      )
    )
    .filter((dirName) => dirName != "scss")
    .map((dirName) => {
      const alias = `~${dirName}`;
      return {
        [dirName]: fileURLToPath(
          new URL(
            `src/${process.env.VUE_APP_PROJECT_NAME}/assets/${dirName}`,
            import.meta.url
          )
        ),
        [alias]: fileURLToPath(
          new URL(
            `src/${process.env.VUE_APP_PROJECT_NAME}/assets/${dirName}`,
            import.meta.url
          )
        ),
      };
    })
    .reduce((prevVal, dirPath) => {
      const aliasList = Object.keys(dirPath);
      aliasList.forEach((alias) => (prevVal[alias] = dirPath[alias]));
      return prevVal;
    }, {});

  console.log(getAssetDirs);

  const projectNameArr = process.env.VUE_APP_PROJECT_NAME.split("/");
  const realProjectName = projectNameArr[projectNameArr.length - 1];

  const defaultPlugin: PluginOption = [];

  if (mode === "publish") {
    defaultPlugin.push(VueDevTools());
  }

  defaultPlugin.push(
    Vue(),
    VueI18nPlugin({
      include: path.resolve(
        __dirname,
        `src/${process.env.VUE_APP_PROJECT_NAME}/locales/**`
      ),
      defaultSFCLang: "json",
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          ...env,
          entryTarget,
          ...inejctList,
        },
      },
    }),
    dynamicImport({
      loose: true,
    })
  );

  if (!isPublishMode) {
    defaultPlugin.push(
      zipPack({
        inDir: buildOption.outDir.replace("assets", ""),
        outDir: `./results/${process.env.VUE_APP_PROJECT_NAME}_zip/${mode}/`,
        outFileName: `${realProjectName}_${new Date().getTime()}.zip`,
      })
    );
  }

  const isLegacy = process.env.VUE_APP_LEGACY === "true";
  // console.log(typeof process.env.VUE_APP_LEGACY);
  if (isLegacy) {
    console.log("🧓👵👨‍🦳👴==========is Legacy Mode!!==========🧓👵👨‍🦳👴");
    defaultPlugin.push(
      legacy({
        targets: ["> 5%"],
      })
    );
  }

  const siteImportList = ["native", "api", "interceptors"];

  const siteImportDirs = siteImportList
    .map((siteImport) => {
      const siteImportAlias = `~${siteImport}`;
      return {
        [siteImportAlias]: fileURLToPath(
          new URL(
            `src/${process.env.VUE_APP_PROJECT_NAME}/${siteImport}`,
            import.meta.url
          )
        ),
      };
    })
    .reduce((prevVal, dirPath) => {
      const alias = Object.keys(dirPath)[0];
      prevVal[alias] = dirPath[alias];
      return prevVal;
    }, {});

  // console.log(siteImportDirs);

  // console.log(
  //   fileURLToPath(
  //     new URL(`src/${process.env.VUE_APP_PROJECT_NAME}`, import.meta.url)
  //   )
  // );

  const projectName = process.env.VUE_APP_PROJECT_NAME.split("/")[1];
  // const dynamicPublicDir = `public/${projectName}/assets`;

  return {
    base: "./",
    publicDir: "public",
    envPrefix: "VUE_APP",
    server: {
      port: 7748,
    },
    esbuild: {
      target: isLegacy ? "es2015" : "esnext",
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
      },
    },
    build: {
      target: isLegacy ? "es2015" : "esnext",
      ...buildOption,
      rollupOptions: {
        external: [`src/${process.env.VUE_APP_PROJECT_NAME}/assets/dynamic/*`],
      },
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "#": fileURLToPath(
          new URL(`src/${process.env.VUE_APP_PROJECT_NAME}`, import.meta.url)
        ),
        // images: path.join(
        //   __dirname,
        //   `src/${process.env.VUE_APP_PROJECT_NAME}/assets/images`
        // ),
        // fonts: path.join(
        //   __dirname,
        //   `src/${process.env.VUE_APP_PROJECT_NAME}/assets/fonts`
        // ),
        // videos: path.join(
        //   __dirname,
        //   `src/${process.env.VUE_APP_PROJECT_NAME}/assets/videos`
        // ),
        "#images": path.join(
          __dirname,
          `src/${process.env.VUE_APP_PROJECT_NAME}/assets/images`
        ),
        ...getAssetDirs,
        ...siteImportDirs,
      },
    },
    plugins: defaultPlugin,
    // Vite 설정
    // define: {
    //   ...env,
    // },
  };
});
