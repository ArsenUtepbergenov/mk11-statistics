<template>
  <div class="flex-sec flex-col card-player">
    <button
      class="flex button-to-tournament tooltip"
      :class="isSelectedClass > -1 ? 'button-to-tournament--selected' : ''"
      @click="toggleToTournament()">
        <i class="fas fa-trophy"></i>
        <span class="tooltip__text">To tournament</span>
    </button>
    <player-avatar />
    <update-player :_id="id" :_name="name" />
  </div>
</template>

<script>
import updatePlayer from '@/components/update-player'
import playerAvatar from './player-avatar'

export default {
  name: 'card-player',
  props: {
    player: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isSelectedClass () {
      return this.$store.getters['getIndexById']({ prop: 'playersForTournament', id: this.id })
    },
    id () {
      return this.player && this.player.id
    },
    name () {
      return this.player && this.player.name
    }
  },
  methods: {
    toggleToTournament () {
      this.$store.dispatch('toggleToTournament', { id: this.id, name: this.name })
    }
  },
  components: {
    updatePlayer,
    playerAvatar
  }
}
</script>
