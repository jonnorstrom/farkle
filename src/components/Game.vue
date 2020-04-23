<template>
  <div>
    <p>Game Code: {{getGameCode}}</p>
    <addPlayer v-if="!gameInProgress"></addPlayer>
    <p
      class="player"
      :class="{'current-player': checkCurrent(player.name)}"
      v-for="player in players" v-bind:key="player.name">
      {{player.name}} : {{player.score}}
    </p>

    <b-button @click="handleStartGame" v-if="!gameInProgress">Start Game</b-button>

    <gameBoard v-if="gameInProgress"></gameBoard>
  </div>
</template>

<script>
import addPlayer from './addPlayer.vue'
import gameBoard from './gameBoard.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    addPlayer,
    gameBoard
  },

  created() {
    if (!this.getGameCode) {
      this.setGameCode(this.$route.params.gameCode)
    }
  },

  methods: {
    ...mapActions(['setGameCode', 'startGame']),

    handleStartGame() {
      this.startGame()
    },

    checkCurrent(name) {
      return name === this.currentPlayer.name
    }
  },

  computed: {
    ...mapGetters([
      'players',
      'currentPlayer',
      'gameInProgress',
      'getGameCode'
    ])
  }
}
</script>

<style>
  .player {
    text-align: left;
    margin: 0px 5px;
  }

  .current-player {
    font-weight: 700;
    text-decoration: underline;
  }
</style>