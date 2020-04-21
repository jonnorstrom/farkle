<template>
  <div id="nav">
    <b-button @click="newGame()">New Game</b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions(['setGameCode']),

    newGame() {
      this.setGameCode()
      this.$router.push({ name: 'Game', params: { gameCode: this.getGameCode }})
    }
  },

  computed: {
    ...mapGetters(['getGameCode']),
  }
}
</script>
