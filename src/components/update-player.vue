<template>
  <div class="flex-cc flex-col update-player">
    <div class="update-player__name">
      <template v-if="!isInputVisible">
        <div class="text">{{_name}}</div>
      </template>
      <template v-else>
        <div class="underline-input">
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
    <div class="flex-ac">
      <button
        v-show="!isInputVisible"
        class="flex button-update tooltip"
        @click="toggleInputVisible()">
          <i class="far fa-edit"></i>
          <span class="tooltip__text">Edit</span>
      </button>
      <button
        class="button-delete"
        @click="deletePlayer()">
          <i class="far fa-trash-alt"></i>
      </button>
    </div>
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
    deletePlayer () {
      if (this._id) {
        this.$store.dispatch('deletePlayer', this._id)
      }
    }
  }
}
</script>
