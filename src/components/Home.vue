<template>
  <div id="nav">
    <b-button @click="newGame">New Game</b-button>

    <b-form @submit="onSubmit" inline>
      <b-form-input
        id="gameCode"
        v-model="gameCode"
        type="text"
        required
        placeholder="Enter Game Code"
      ></b-form-input>
      <b-button type="submit" variant="primary">Enter</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      gameCode: ''
    }
  },

  methods: {
    ...mapActions(['setGameCode']),

    newGame() {
      this.setGameCode()
      this.$router.push({ name: 'Game', params: { gameCode: this.getGameCode }})
    },

    onSubmit(e) {
      e.preventDefault()
      this.setGameCode(this.gameCode)
      this.$router.push({ name: 'Game', params: { gameCode: this.getGameCode }})
    }
  },

  computed: {
    ...mapGetters(['getGameCode']),
  }
}
</script>
