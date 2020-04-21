import Vue from 'vue'
import Vuex from 'vuex'
import randomstring from 'randomstring'

Vue.use(Vuex)

// TODO: if user navigates directly to game room, need to get gameCode
// from URL and set state's gameCode there - otherwise it's blank
export default new Vuex.Store({
  state: {
    gameCode: '',
    players: [],
    currentPlayer: 0
  },

  getters: {
    getGameCode(state) {
      return state.gameCode
    },

    // https://stackoverflow.com/questions/41503527/vuexjs-getter-with-argument
    // https://codeburst.io/vuex-getters-are-great-but-dont-overuse-them-9c946689b414
    getPlayer: (state) => (name) => {
      return state.players.find(player => player.name === name)
    },

    getCurrentPlayer(state) {
      return state.players[state.currentPlayer]
    },

    players(state) {
      return state.players
    }
  },

  mutations: {
    setGameCode(state) {
      state.gameCode = randomstring.generate(5);
    },

    addPlayer(state, name) {
      state.players.push(
        { name,
          score: 0,
          farkleCount: 0
        }
      )
    },

    // this maybe could get broken into new pieces
    endTurn(state, score) {
      let player = state.getCurrentPlyer()
      if (score === 0) {
        if (player.farkleCount === 2) {
          player.score -= 500
          player.farkleCount = 0
        } else {
          player.farkleCount += 1
        }
      } else {
        player.score += score
      }
    }
  },

  actions: {
    setGameCode(state) {
      state.commit('setGameCode')
    },

    endTurn(state, score) {
      state.commit('endTurn', score)
    },

    addPlayer(state, name) {
      state.commit('addPlayer', name)
    }
  },
})
