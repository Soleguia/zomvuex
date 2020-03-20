export default {
  namespaced: true,
  state: {
    historico: [
      {
        partida: {
          numero: 1,
          rondas: [
            {
              numero: 1,
              tiradas: [
                [
                  {
                    dice: { color: "red" },
                    face: "shot"
                  },
                  {
                    dice: { color: "green" },
                    face: "brain"
                  },
                  {
                    dice: { color: "yellow" },
                    face: "footsteps"
                  }
                ]
              ]
            },
            {
              numero: 2,
              tiradas: [
                [
                  {
                    dice: { color: "red" },
                    face: "footsteps"
                  },
                  {
                    dice: { color: "green" },
                    face: "brain"
                  },
                  {
                    dice: { color: "yellow" },
                    face: "footsteps"
                  }
                ],
                [
                  {
                    dice: { color: "red" },
                    face: "shot"
                  },
                  {
                    dice: { color: "green" },
                    face: "brain"
                  },
                  {
                    dice: { color: "yellow" },
                    face: "footsteps"
                  }
                ],
                [
                  {
                    dice: { color: "yellow" },
                    face: "brain"
                  },
                  {
                    dice: { color: "green" },
                    face: "shot"
                  },
                  {
                    dice: { color: "green" },
                    face: "shot"
                  }
                ]
              ]
            }
          ]
        }
      },
      {
        partida: {
          numero: 2,
          rondas: [
            {
              numero: 1,
              tiradas: [
                [
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
                ]
              ]
            }
          ]
        }
      }
    ],
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
