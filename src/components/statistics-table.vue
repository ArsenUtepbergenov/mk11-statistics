<template>
  <div class="flex-col statistics-table">
    <input
      class="input"
      type="text"
      ref="searchInput"
      @keyup="searchByName()"
      placeholder="Search by name..."
      title="Search by name">
    <table ref="statisticsTable" class="table">
      <th class="table__th">Name</th>
      <th class="table__th">Status</th>
      <th class="table__th">Score</th>
      <tr>
        <td class="table__td">
          <add-player />
        </td>
      </tr>
      <tr v-for="player in players" :key="player.id" class="table__tr">
        <td class="table__td">
          <update-player :_id="player.id" :_name="player.name" />
        </td>
        <td class="table__td">{{player.status}}</td>
        <td class="table__td">{{player.score}}</td>
        <td class="table__td">
          <button
            class="flex button-delete tooltip"
            @click="deletePlayer(player.id)">
              <i class="far fa-trash-alt"></i>
              <span class="tooltip__text">Delete the player</span>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import addPlayer from './add-player'
import updatePlayer from './update-player'

export default {
  name: 'statistics-table',
  props: {
    players: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    searchByName () {
      const input = this.$refs.searchInput
      const filter = input.value.toLowerCase()
      const statisticsTable = this.$refs.statisticsTable
      let tr = statisticsTable.querySelectorAll('tr')
      for (let i = 0; i < tr.length; i++) {
        let td = tr[i].querySelectorAll('td')[0]
        if (td) {
          let txtValue = td.textContent || td.innerText
          if (txtValue.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = ''
          } else {
            tr[i].style.display = 'none'
          }
        }
      }
    },
    deletePlayer (id) {
      if (id) {
        this.$store.dispatch('deletePlayer', id)
      }
    }
  },
  components: {
    addPlayer,
    updatePlayer
  }
}
</script>
