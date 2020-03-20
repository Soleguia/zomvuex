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

Vue.component(
  "pantalla-inicio",
  require("./components/PantallaInicio.vue").default
);
Vue.component(
  "pantalla-info",
  require("./components/PantallaInfo.vue").default
);
Vue.component(
  "pantalla-historico",
  require("./components/PantallaHistorico.vue").default
);
Vue.component(
  "pantalla-juego",
  require("./components/PantallaJuego.vue").default
);
Vue.component(
  "game-marker",
  require("./components/GameMarkerComponent.vue").default
);
Vue.component(
  "dice-component",
  require("./components/DiceComponent.vue").default
);
Vue.component(
  "dice-counter",
  require("./components/DiceCounterComponent.vue").default
);
Vue.component(
  "dice-roll",
  require("./components/DiceRollComponent.vue").default
);

new Vue({
  el: "#app",
  store,
  components: {
    App
  }
});
