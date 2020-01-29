import Vue from "vue";
import Vuex from "vuex";
import _default from "vuex";
import ssot from "./modules/ssot";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ssot: ssot
  }
});
