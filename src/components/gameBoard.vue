<template>
  <div>
    <b-button @click="rollDice" :disabled="rollable">Roll dem Dice</b-button>
    <b-button @click="endTheTurn">End my Turn</b-button>

    <h2>Running Total: {{this.runningTotal}}</h2>
    <div class="dice-wrapper">
      <div class="die" v-for="(d, i) in dice" v-bind:key="i">
        <img
          :class="{'selected-die': isSelected(i)}"
          @click="toggleDie(d, i)"
          :src="require('../assets/d' + (d) + '.svg')"
        >
      </div>
    </div>

    <h4>Tray: {{this.turnTotal}}</h4>
    <div class="dice-wrapper">
      <div class="die" v-for="(d, i) in previousRolls" v-bind:key="i">
        <img :src="require('../assets/d' + (d) + '.svg')">
      </div>
    </div>
  </div>
</template>

<script>
import Roll from '../roll.js'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      runningTotal: 0,
      turnTotal: 0,
      diceRemaining: 6,
      previousRolls: [],
      selectedDice: [],
      dice: [],
      firstRoll: true
    }
  },

  // currently if you FARKLE - no way of ending turn
  // currently not checking score to see if over 500 before on board

  methods: {
    ...mapActions(['endTurn']),

    totalReset() {
      this.runningTotal = 0,
      this.turnTotal = 0,
      this.diceRemaining = 6,
      this.previousRolls = [],
      this.selectedDice = [],
      this.dice = [],
      this.firstRoll = true
    },

    endTheTurn() {
      if (this.selectedDice.length === 0) {
        this.endTurn(0)
      } else {
        this.endTurn(this.runningTotal + this.turnTotal)
      }

      this.totalReset()
    },

    rollDice() {
      this.firstRoll = false
      this.runningTotal = 0
      this.turnTotal += new Roll(this.selectedDice.map(d => d.value)).getScore()
      this.previousRolls.push(...this.selectedDice.map(d => d.value))
      this.diceRemaining -= this.selectedDice.length

      if (this.diceRemaining === 0) {
        this.diceRemaining = 6
      }

      this.selectedDice = []
      this.dice = []
      // move selected dice values to previousRolls
      for (let i = 1; i <= this.diceRemaining; i++) {
        this.dice.push(Math.ceil(Math.random() * 6))
      }
    },

    toggleDie(d, i) {
      let targetIndex = this.selectedDice.findIndex(die => die.index === i)
      if (targetIndex >= 0) {
        this.selectedDice.splice(targetIndex, 1)
      } else {
        this.selectedDice.push({index: i, value: d})
      }

      this.getRunningTotal()
    },

    getRunningTotal() {
      let roll = new Roll(this.selectedDice.map(d => d.value))
      this.runningTotal = roll.getScore()
    },

    isSelected(i) {
      return this.selectedDice.map(die => die.index).includes(i)
    },
  },

  computed: {
    rollable() {
      return !this.firstRoll && !this.selectedDice.length
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

  .selected-die {
    border: 3px blue dotted;
  }

  img {
    height: 100%;
    width: 100%;
  }
</style>