import { db } from '../firebase'

export default {
  fetchPlayers () {
    return db.collection('players').orderBy('name').get()
  },
  addPlayer (data) {
    return db.collection('players').add(data)
  },
  deletePlayer (id) {
    return db.collection('players').doc(id).delete()
  }
}
