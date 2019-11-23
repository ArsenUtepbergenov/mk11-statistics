<template>
  <div class="flex-cc flex-col add-player">
    <template v-if="!isInputVisible">
      <div
        class="flex-cc button-add tooltip"
        @click="toggleInputVisible()">
        <i class="fas fa-user-plus"></i>
        <span class="tooltip__text">Add new player</span>
      </div>
    </template>
    <template v-else>
      <div
        class="flex underline-input">
        <input
          type="text"
          class="underline-input__input"
          placeholder="New player..."
          @keyup.enter.prevent="addPlayer()"
          v-focus
          v-model="name"/>
        <span class="underline-input__underline"></span>
      </div>
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
            status: 'Beginner',
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
