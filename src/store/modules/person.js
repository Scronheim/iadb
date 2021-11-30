import axios from 'axios'
import moment from 'moment'

const personModule = {
  state: () => ({
    currentPerson: {
      country: {},
    },
  }),
  mutations: {
    setCurrentPerson(state, payload) {
      state.currentPerson = payload
    },
  },
  actions: {
    async getPersonInfo({commit}, id) {
      const {data} = await axios.get(`/api/person/id/${id}`)
      data.data.birthDate = moment(data.data.birthDate).format('YYYY-MM-DD')
      commit('setCurrentPerson', data.data)
    },
    addPerson(context, payload) {
      return axios.post('/api/people', payload)
    },
    savePerson({state}) {
      return axios.patch('/api/people', state.currentPerson)
    },
    addPersonToAlbum(context, payload) {
      return axios.post('/api/people/album', payload)
    },
    removePersonFromAlbum(context, payload) {
      return axios.delete('/api/people/album', {
        headers: {},
        data: payload
      })
    },
    addPersonToBand(context, payload) {
      return axios.post('/api/people/band', payload)
    },
    removePersonFromBand(context, payload) {
      return axios.delete('/api/people/band', {
        headers: {},
        data: payload
      })
    },
    async searchPeople(context, payload) {
      return await axios.get(`/api/people?search=${payload}`)
    },
  },
  getters: {
    currentPerson: state => state.currentPerson,
  }
}

export default personModule
