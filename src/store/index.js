import Vue from 'vue'
import Vuex from 'vuex'
import randomstring from 'randomstring'
import Player from './player'

Vue.use(Vuex)

// TODO: if user navigates directly to game room, need to get gameCode
// from URL and set state's gameCode there - otherwise it's blank
export default new Vuex.Store({
  state: {
    gameCode: '',
    players: [],
    currentPlayer: 0,
    gameInProgress: false
  },

  getters: {
    getGameCode: state => state.gameCode,

    gameInProgress: state => state.gameInProgress,

    players: state => state.players,

    currentPlayer: state => state.players[state.currentPlayer],

    // follow this for when getter needs arguments
    player: (state) => (name) => {
      return state.players.find(player => player.name === name)
    },
  },

  mutations: {
    setGameCode(state) {
      state.gameCode = randomstring.generate(5);
    },

    addPlayer(state, name) {
      state.players.push(new Player(name))
    },

    // this should get broken into new pieces
    endTurn(state, score) {
      let player = state.currentPlayer()

      if (score === 0) {
        if (player.farkleCount === 2 && player.onBoardYet) {
          player.score -= 500
          player.farkleCount = 0
        } else {
          player.farkleCount += 1
        }
      } else {
        if (!player.onBoardYet) {
          player.onBoardYet = true
        }
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
