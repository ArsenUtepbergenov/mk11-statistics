<template>
  <div class="add-player">
    <template v-if="!isInputVisible">
      <button
        class="flex-sc button-add tooltip"
        @click="toggleInputVisible">
        <span class="add-player__text">+</span>
        <span class="tooltip__text">Add new player</span>
      </button>
    </template>
    <template v-else>
      <input
        type="text"
        class="add-player__input"
        placeholder="New player..."
        @keyup.enter.prevent="addPlayer"
        v-focus
        v-model="name"/>
        <span class="underline"></span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'add-player',
  data () {
    return {
      name: '',
      isInputVisible: false
    }
  },
  methods: {
    addPlayer () {
      this.toggleInputVisible()
      if (this.name !== '') {
        this.$store.dispatch('addPlayer',
          {
            name: this.name,
            status: 'Bad player',
            score: 0
          })
        this.name = ''
      }
    },
    toggleInputVisible () {
      this.isInputVisible = !this.isInputVisible
    }
  }
}
</script>
