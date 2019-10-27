import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: []
  },
  mutations: {
    setPlayers (state, data) {
      state.players = data
    },
    addPlayer (state, data) {
      state.players.push(data)
    },
    deletePlayer (state, id) {
      const index = state.players.findIndex(player => player.id === id)
      state.players.splice(index, 1)
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
        })
        .catch(error => {
          console.error('Error fetch rooms collection: ', error)
        })
    },
    addPlayer (context, data) {
      api.addPlayer(data)
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id)
          context.commit('addPlayer', {
            id: docRef.id,
            ...data
          })
        })
        .catch(error => {
          console.error('Error add room document: ', error)
        })
    },
    deletePlayer (context, id) {
      const tempId = id
      api.deletePlayer(id)
        .then(() => {
          console.log('The player successfully deleted!', tempId)
          context.commit('deletePlayer', tempId)
        })
        .catch(error => console.error('Error removing document: ', error))
    }
  }
})
