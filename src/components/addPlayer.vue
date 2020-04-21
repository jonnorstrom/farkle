<template>
  <b-form @submit="onSubmit" inline>
      <b-form-input
        id="name"
        v-model="name"
        type="text"
        required
        placeholder="Enter Name"
      ></b-form-input>
      <b-button type="submit" variant="primary">Save</b-button>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      name: ''
    }
  },

  methods: {
    ...mapActions(['addPlayer']),

    onSubmit(e) {
        e.preventDefault()
        this.addPlayer(this.name)
        this.name = ''
      },
  }
}
</script>