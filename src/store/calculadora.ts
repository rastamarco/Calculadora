export const Calculadora = {
  state:{
    stateCalc: null,
    amountCalc: null
  },
  getters:{
     stateCalc(state) {
      return state.stateCalc;
    },
  },
  mutations:{
    SetStateCalc(state, value) {
      state.stateCalc = value;
    },

  },
  actions:{
    async SetStateCalc({ commit }, options){
     await commit('SetStateCalc', options.state)
    }, 

  }
};