import Vue from 'vue'
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
    addBand({dispatch}, payload) {
      axios.post('/api/band', payload).then(() => {
        Vue.$toast.success(`Band "${payload.title}" successful added`)
      }).catch((err) => {
        dispatch('axiosErrorHandler', err)
      })
    },
    saveBand({state, dispatch}) {
      axios.patch('/api/band', state.currentBand).then(() => {
        Vue.$toast.success(`Band "${state.currentBand.title}" successful saved`)
      }).catch((err) => {
        dispatch('axiosErrorHandler', err)
      })
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
