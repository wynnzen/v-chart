import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import chart from "./modules/chart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chart,
  },
  state: {},
  mutations: {},
  actions: {},
  getters,
});
