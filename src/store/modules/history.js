export default {
  namespaced: true,
  state: {
    tiradas: []
  },
  getters: {
    historicoPartida(state) {
      return state.tiradas;
    }
  },
  mutations: {
    guardarTirada(state, registro) {
      state.tiradas.push(registro);
    }
  }
};
