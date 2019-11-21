<template>
  <div class="flex-bc update-player">
    <template v-if="!isInputVisible">
      <button
        class="flex button-to-tournament tooltip"
        :class="isSelectedClass > -1 ? 'button-to-tournament--selected' : ''"
        @click="toggleToTournament()">
          <i class="fas fa-trophy"></i>
          <span class="tooltip__text">To tournament</span>
      </button>
      <span class="update-player__name">{{name}}</span>
      <button
        class="flex button-update tooltip"
        @click="toggleInputVisible()">
          <i class="far fa-edit"></i>
          <span class="tooltip__text">New name</span>
      </button>
    </template>
    <template v-else>
      <div class="underline-input underline-input--name">
        <input
          type="text"
          class="underline-input__input"
          placeholder="New name..."
          @keyup.enter.prevent="updatePlayerName()"
          v-focus
          v-model="name"/>
        <span class="underline-input__underline"></span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'update-player',
  data () {
    return {
      name: this._name,
      isInputVisible: false
    }
  },
  props: {
    _id: {
      type: String,
      default: ''
    },
    _name: {
      type: String,
      default: ''
    }
  },
  computed: {
    isSelectedClass () {
      return this.$store.getters['getIndexById']({ prop: 'playersForTournament', id: this._id })
    }
  },
  methods: {
    toggleInputVisible () {
      this.isInputVisible = !this.isInputVisible
    },
    updatePlayerName () {
      this.toggleInputVisible()
      if (this.name && this.name !== this._name) {
        this.$store.dispatch('updatePlayerName', { id: this._id, name: this.name })
      }
    },
    toggleToTournament () {
      this.$store.dispatch('toggleToTournament', { id: this._id, name: this.name })
    }
  }
}
</script>
