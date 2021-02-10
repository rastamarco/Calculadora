import Vue from 'vue'
import Vuex from 'vuex'
import { Calculadora }  from './calculadora'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Calculadora
  }
})
