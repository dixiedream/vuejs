import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import i18nConfig from "./i18n/config";
import router from "./router";
import worker from "./mocks/browser";

if (import.meta.env.MODE === "development") {
    worker.start();
}

const i18n = createI18n(i18nConfig);
createApp(App).use(router).use(i18n).mount("#app");
