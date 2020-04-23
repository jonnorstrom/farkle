<template>
  <div>
    <b-button @click="rollDice">Roll dem Dice</b-button>

    <div class="dice-wrapper">
      <div class="die" v-for="(d, i) in dice" v-bind:key="i">
        <img :src="require('../assets/d' + (d+1) + '.svg')">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      runningTotal: 0,
      diceRemaining: 6,
      previousRolls: [],
      diceToScore: [],
      dice: [],
    }
  },

  methods: {
    rollDice() {
      for (let i = 1; i <= this.diceRemaining; i++) {
        this.dice.push(Math.floor(Math.random() * 6))
      }
    }
  }
}
</script>

<style>
  .dice-wrapper {
    display: flex;
    padding: 10px;
  }

  .die {
    max-width: 100px;
    max-height: 100px;
    margin: 5px;
  }

  img {
    height: 100%;
    width: 100%;
  }
</style>