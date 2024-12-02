interface ImportMetaEnv {
  readonly VUE_APP_PROJECT_NAME: string;
  readonly VUE_APP_CONTENTS_VERSION: string;
  readonly VUE_APP_PROJECT_NAME: string;
  readonly VUE_APP_LOCAL_URL: string;
  readonly VUE_APP_DEV_URL: string;
  readonly VUE_APP_PRODUCT_URL: string;
  readonly VUE_APP_MOCK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
