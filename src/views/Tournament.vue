<template>
  <div class="tournament">
    <tournament-tree :names="playersNames" />
  </div>
</template>

<script>
import tournamentTree from '@/components/tournament-tree'

export default {
  name: 'tournament',
  computed: {
    playersNames () {
      return this.$store.getters.getPlayersNames
    }
  },
  components: {
    tournamentTree
  }
}
</script>
