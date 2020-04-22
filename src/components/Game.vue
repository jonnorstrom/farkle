<template>
  <div>
    <h1>in the game component</h1>
    <addPlayer></addPlayer>

    <h2 v-if="currentPlayer && gameInProgress">Current Turn: {{currentPlayer.name}}</h2>

    <ul>
      <li v-for="player in players" v-bind:key="player.name">{{player.name}}</li>
    </ul>
  </div>
</template>

<script>
import addPlayer from './addPlayer.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    addPlayer
  },

  computed: {
    ...mapGetters(['players', 'currentPlayer', 'gameInProgress'])
  }
}
</script>