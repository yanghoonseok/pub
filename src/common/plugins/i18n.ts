import { Dic } from "./../models/common";
import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";
/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
//  */
// function loadLocaleMessages() {
//   const locales = require.context(
//     `@/${process.env.VUE_APP_PROJECT_NAME}/locales/`,
//     true,
//     /[A-Za-z0-9-_,\s]+\.json$/i
//   );

//   const messages: Dic<string> = {};
//   locales.keys().forEach((key) => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i);
//     if (matched && matched.length > 1) {
//       const locale = matched[1];
//       messages[locale] = locales(key);
//     }
//   });
//   return messages;
// }

export const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  globalInjection: true,
  messages,
});


export default i18n;