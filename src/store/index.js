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
    }
  }
})
