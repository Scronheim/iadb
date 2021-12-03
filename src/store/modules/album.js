import axios from 'axios'

const albumModule = {
  state: () => ({
    currentAlbum: {
      band: {},
      label: {},
      trackList: [],
    },
  }),
  mutations: {
    setCurrentAlbum(state, payload) {
      state.currentAlbum = payload
    },
  },
  actions: {
    async getAlbumInfo({commit}, id) {
      const response = await axios.get(`/api/album/id/${id}`)
      commit('setCurrentAlbum', response.data.data)
    },
    addAlbum(context, payload) {
      return axios.post('/api/album', payload)
    },
    saveAlbum({state}) {
      return axios.patch('/api/album', state.currentAlbum)
    },
    async searchAlbum(context, payload) {
      return await axios.get(`/api/album?search=${payload}`)
    },
  },
  getters: {
    currentAlbum: state => state.currentAlbum,
  }
}

export default albumModule
