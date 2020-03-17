import Vue from "vue";
import Vuex from "vuex";
// import _default from "vuex";
import ssot from "./modules/ssot";
import history from "./modules/history";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ssot: ssot,
    history: history
  }
});
