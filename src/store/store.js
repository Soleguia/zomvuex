import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    partida: false,
    jugadores: []
  },
  mutations: {
    guardarJugador(state, jugador) {
      state.jugadores.push(jugador);
    },
    empezarPartida(state) {
      state.partida = true;
    }
  }
});
