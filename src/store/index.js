import Vue from 'vue'
import Vuex from 'vuex'
import randomstring from 'randomstring'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameCode: '',
    players: [],
  },
  getters: {
    getGameCode: state => {
      return state.gameCode
    }
  },
  mutations: {
    setGameCode(state) {
      state.gameCode = randomstring.generate(5);
    }
  },
  actions: {
    setGameCode(state) {
      state.commit('setGameCode')
    }
  },
})
