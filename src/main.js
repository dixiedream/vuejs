import Vue from "vue";
import App from "./App.vue";
import router from "./router";

const { NODE_ENV } = process.env;

Vue.config.productionTip = NODE_ENV === "development";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
