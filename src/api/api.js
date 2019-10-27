import { db } from '../firebase'

export default {
  fetchPlayers () {
    return db.collection('players').orderBy('name').get()
  }
}
