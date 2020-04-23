<template>
  <div>
    <b-button @click="rollDice">Roll dem Dice</b-button>

    <div class="dice-wrapper">
      <div class="die" v-for="(d, i) in dice" v-bind:key="i">
        <img
          :class="{'selected-die': isSelected(i)}"
          @click="toggleDie(d, i)"
          :src="require('../assets/d' + (d) + '.svg')"
        >
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
      selectedDice: [],
      dice: [],
    }
  },

  methods: {
    rollDice() {
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
    },

    isSelected(i) {
      return this.selectedDice.map(die => die.index).includes(i)
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