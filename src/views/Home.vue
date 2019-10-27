<template>
  <div class="home">
    <statistics-table :players="players" />
  </div>
</template>

<script>
import statisticsTable from '@/components/statistics-table'

export default {
  name: 'home',
  components: {
    statisticsTable
  },
  created () {
    this.$store.dispatch('fetchPlayers')
  },
  computed: {
    players () {
      return this.$store.state.players
    }
  }
}
</script>
