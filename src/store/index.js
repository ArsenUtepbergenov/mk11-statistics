import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    playersForTournament: [],
    playersLoading: true
  },
  mutations: {
    setPlayers (state, data) {
      state.players = data
    },
    addPlayerForTournament (state, data) {
      state.playersForTournament.push(data)
    },
    setPlayersLoadingStatus (state, status) {
      state.playersLoading = status
    },
    addPlayer (state, data) {
      state.players.push(data)
    },
    deletePlayerForTournament (state, index) {
      state.playersForTournament.splice(index, 1)
    },
    deletePlayer (state, id) {
      const index = state.players.findIndex(player => player.id === id)
      state.players.splice(index, 1)
    },
    setNewNamePlayer (state, data) {
      const { id, name } = data
      const index = state.players.findIndex(player => player.id === id)
      state.players[index].name = name
    }
  },
  actions: {
    fetchPlayers ({ commit }) {
      let data = []
      api.fetchPlayers()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const dataDoc = {
              id: doc.id, ...doc.data()
            }
            data.push(dataDoc)
          })
          commit('setPlayers', data)
          commit('setPlayersLoadingStatus', false)
        })
        .catch(error => {
          console.error('Error fetch rooms collection: ', error)
        })
    },
    addPlayer ({ commit }, data) {
      api.addPlayer(data)
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id)
          commit('addPlayer', {
            id: docRef.id,
            ...data
          })
        })
        .catch(error => {
          console.error('Error add room document: ', error)
        })
    },
    deletePlayer ({ commit }, id) {
      const tempId = id
      api.deletePlayer(id)
        .then(() => {
          console.log('The player successfully deleted!', tempId)
          commit('deletePlayer', tempId)
        })
        .catch(error => console.error('Error removing document: ', error))
    },
    updatePlayerName ({ commit }, data) {
      api.updatePlayerName(data)
        .then(() => {
          commit('setNewNamePlayer', data)
        })
        .catch(error => {
          console.error('Error updating document: ', error)
        })
    },
    toggleToTournament ({ commit, getters, state }, data) {
      const { id, name } = data
      const index = getters['getIndexById']({ prop: 'playersForTournament', id })
      if (index > -1 && state.playersForTournament.length) {
        commit('deletePlayerForTournament', index)
      } else if (data) {
        commit('addPlayerForTournament', { id, name })
      }
    },
    addAllToTournament ({ state, commit, dispatch }, players) {
      for (const player of players) {
        dispatch('toggleToTournament', { id: player.id, name: player.name })
      }
    }
  },
  getters: {
    getIndexById: state => data => {
      const { prop, id } = data
      if (prop && id) {
        const index = state[prop].findIndex(item => item.id === id)
        return index
      } else {
        return -1
      }
    },
    getPlayers (state) {
      return state.players
    },
    getPlayersForTournament (state) {
      return state.playersForTournament
    },
    getPlayersNames (state, getters) {
      const players = getters.getPlayersForTournament
      let names = []
      for (const player of players) {
        names.push(player.name)
      }
      return names
    },
    getPlayersLength (state) {
      return state.players.length
    },
    isPlayersLoading (state) {
      return state.playersLoading
    }
  }
})
