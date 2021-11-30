import axios from 'axios'

const labelModule = {
  state: () => ({
    currentLabel: {
      status: 'active',
    },
  }),
  mutations: {
    setCurrentLabel(state, payload) {
      state.currentLabel = payload
    },
  },
  actions: {
    async getLabelInfo({commit}, id) {
      const {data} = await axios.get(`/api/label/id/${id}`)
      commit('setCurrentLabel', data.data)
    },
    async searchLabel(context, payload) {
      return await axios.get(`/api/label?search=${payload}`)
    },
  },
  getters: {
    currentLabel: state => state.currentLabel,
  }
}

export default labelModule
