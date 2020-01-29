import Vue from "vue";
import store from "./store";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.filter("colorDados", function(value) {
  var color = {
    red: "rojo",
    green: "verde",
    yellow: "amarillo"
  };
  return color[value];
});
Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  el: "#app",
  store,
  components: {
    App
  }
});
