import Vue from 'vue'
import Vuex from 'vuex'
import randomstring from 'randomstring'
import Player from './player'

Vue.use(Vuex)

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

    // follow this pattern for when getter needs arguments
    player: (state) => (name) => {
      return state.players.find(player => player.name === name)
    },
  },

  mutations: {
    startGame: state => state.gameInProgress = true,

    setGameCode(state, gameCode) {
      if (gameCode) {
        state.gameCode = gameCode
      } else {
        state.gameCode = randomstring.generate(5);
      }
    },

    addPlayer: (state, name) => state.players.push(new Player(name)),

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
        // check for 10,000 to start 'theFinalRound'
        // check for winner (last person to go in 'theFinalRound')
        // if above is n/a, move to next player
      }
    }
  },

  actions: {
    setGameCode: (state, gameCode) => state.commit('setGameCode', gameCode),

    endTurn: (state, score) => state.commit('endTurn', score),

    addPlayer: (state, name) => state.commit('addPlayer', name),

    startGame: (state) => state.commit('startGame'),
  },
})
