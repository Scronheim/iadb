import axios from 'axios'

const bandModule = {
  state: () => ({
    currentBand: {
      albums: [],
      country: {},
      label: {},
      status: 'active',
    },
  }),
  mutations: {
    setCurrentBand(state, payload) {
      state.currentBand = payload
    },
  },
  actions: {
    async getBandInfo({commit}, id) {
      const {data} = await axios.get(`/api/band/id/${id}`)
      commit('setCurrentBand', data.data)
    },
    addBand(context, payload) {
      return axios.post('/api/band', payload)
    },
    saveBand({state}) {
      return axios.patch('/api/band', state.currentBand)
    },
    async searchBand(context, payload) {
      return await axios.get(`/api/band?search=${payload}`)
    },
  },
  getters: {
    currentBand: state => state.currentBand,
  }
}

export default bandModule
