// import VueCompositionAPI from "@vue/composition-api";
// Vue.use(VueCompositionAPI);
import { nanoid } from "nanoid";
import Vue from "vue";
import App from "./App.vue";
import "./core/lazy_use";
import router from "./router";
import store from "./store/";

Vue.config.productionTip = false;
Vue.prototype.$nid = nanoid;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
