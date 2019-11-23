<template>
  <div class="flex-col statistics-table">
    <div class="underline-input">
      <input
        type="text"
        class="underline-input__input"
        ref="searchInput"
        @keyup="searchByName()"
        placeholder="Search by name..."
        title="Search by name">
      <span class="underline-input__underline"></span>
    </div>
    <table ref="statisticsTable" class="table">
      <th class="table__th">Name</th>
      <th class="table__th">Status</th>
      <th class="table__th">Score</th>
      <tr v-for="player in players" :key="player.id" class="table__tr">
        <td class="table__td">{{player.name}}</td>
        <td class="table__td">{{player.status}}</td>
        <td class="table__td">{{player.score}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
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
    }
  }
}
</script>
