<template>
  <div class="home">
    <template v-if="!isPlayersLoading">
      <statistics-table :players="players" />
    </template>
    <template v-else>
      <loading-indicator />
    </template>
  </div>
</template>

<script>
import statisticsTable from '@/components/statistics-table'
import loadingIndicator from '@/components/loading-indicator'

export default {
  name: 'home',
  components: {
    statisticsTable,
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
    },
    playersForTournament () {
      return this.$store.getters.getPlayersForTournament
    }
  }
}
</script>
