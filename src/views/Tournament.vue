<template>
  <div class="tournament">
    <div>
      {{playersForTournament}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  computed: {
    playersForTournament () {
      return this.$store.getters.getPlayersForTournament
    }
  }
}
</script>
