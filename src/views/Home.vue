<template>
  <div class="home">
    <div class="flex-cc">
      <button key="Math.randome()" class="button-all-to-tournament" @click="addAllToTournament">
        <span>All to tournament</span>
        <i class="fas fa-share-square button-all-to-tournament__icon"></i>
      </button>
    </div>
    <template v-if="!isPlayersLoading">
      <div class="flex-cc wrap">
        <card-player
          v-for="player in players"
          :player="player"
          :key="player.Id" />
        <add-player />
      </div>
    </template>
    <template v-else>
      <loading-indicator />
    </template>
  </div>
</template>

<script>
import loadingIndicator from '@/components/loading-indicator'
import cardPlayer from '@/components/card-player'
import addPlayer from '@/components/add-player'

export default {
  name: 'home',
  components: {
    addPlayer,
    cardPlayer,
    loadingIndicator
  },
  created () {
    this.$store.dispatch('fetchPlayers')
  },
  computed: {
    players () {
      return this.$store.getters.getPlayers
    },
    isPlayersLoading () {
      return this.$store.getters.isPlayersLoading
    }
  },
  methods: {
    toggleToTournament () {
      this.$store.dispatch('toggleToTournament', { id: this.id, name: this.name })
    },
    addAllToTournament () {
      this.$store.dispatch('addAllToTournament', this.players)
    }
  }
}
</script>
