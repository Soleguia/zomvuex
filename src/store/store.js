import Vue from "vue";
import Vuex from "vuex";
import _default from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    partida: false,
    jugadores: [],
    gameover: false,
    win: false,
    disparos: 0,
    cerebros: 0,
    totalDados: 13,
    totalCerebros: 0,
    dados: [
      {
        color: "red",
        cantidad: 3,
        disponibles: 3,
        faces: {
          1: "brain",
          2: "footsteps",
          3: "footsteps",
          4: "shot",
          5: "shot",
          6: "shot"
        }
      },
      {
        color: "yellow",
        cantidad: 4,
        disponibles: 4,
        faces: {
          1: "brain",
          2: "brain",
          3: "footsteps",
          4: "footsteps",
          5: "shot",
          6: "shot"
        }
      },
      {
        color: "green",
        cantidad: 6,
        disponibles: 6,
        faces: {
          1: "brain",
          2: "brain",
          3: "brain",
          4: "shot",
          5: "footsteps",
          6: "shot"
        }
      }
    ],
    tiradaVacia: [
      {
        dice: { color: "grey" },
        face: "zombie"
      },
      {
        dice: { color: "grey" },
        face: "zombie"
      },
      {
        dice: { color: "grey" },
        face: "zombie"
      }
    ],
    partidasJugadas: [{ ronda: 1 }],
    partidaActual: 0
  },
  getters: {
    partidasJugadas(state) {
      return state.partidasJugadas.length;
    },
    rondaActual(state) {
      return state.partidasJugadas[state.partidaActual].ronda;
    }
  },
  mutations: {
    guardarJugador(state, jugador) {
      state.jugadores.push(jugador);
    },
    estadoPartida(state, value) {
      state.partida = value;
    },
    sumarCerebro(state) {
      state.cerebros++;
    },
    sumarDisparo(state) {
      state.disparos++;
    },
    actualizarTotalDados(state, dados) {
      state.totalDados = dados;
    },
    actualizarTotalCerebros(state, cerebros) {
      state.totalCerebros = cerebros;
    },
    actualizarFinPartida(state, value) {
      state.gameover = value;
    },
    actualizarVictoria(state, value) {
      state.win = value;
    },
    reiniciarTurno(state) {
      state.partidasJugadas[state.partidaActual].rondas++;
      state.totalDados = 13;
      state.cerebros = 0;
      state.disparos = 0;
      state.dados.map(dado => {
        return (dado.disponibles = dado.cantidad);
      });
    },
    nuevaPartida(state) {
      Object.assign(state.partidasJugadas, { ronda: 0 });
      state.partidaActual++;
    },
    sumarRonda(state, partida) {
      state.partidasJugadas[partida].rondas++;
    }
  }
});
