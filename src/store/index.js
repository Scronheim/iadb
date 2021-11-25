import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentBand: {
      albums: [],
    },
    currentAlbum: {
      band: {},
      label: {},
    },
    currentLabel: {},
    albumTypes: ['Full-length', 'EP', 'Single', 'Demo', 'Compilation', 'Split'],
  },
  mutations: {
    setCurrentBand(state, payload) {
      state.currentBand = payload
    },
    setCurrentAlbum(state, payload) {
      state.currentAlbum = payload
    },
    setCurrentLabel(state, payload) {
      state.currentLabel = payload
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
    async getAlbumInfo({commit}, id) {
      const {data} = await axios.get(`/api/album/id/${id}`)
      commit('setCurrentAlbum', data.data)
    },
    addAlbum(context, payload) {
      return axios.post('/api/album', payload)
    },
    saveAlbum({state}) {
      return axios.patch('/api/album', state.currentAlbum)
    },
    async getLabelInfo({commit}, id) {
      const {data} = await axios.get(`/api/label/id/${id}`)
      commit('setCurrentLabel', data.data)
    },
    async searchBand(context, payload) {
      return await axios.get(`/api/band?search=${payload}`)
    },
    async searchAlbum(context, payload) {
      return await axios.get(`/api/album?search=${payload}`)
    },
    async searchLabel(context, payload) {
      return await axios.get(`/api/label?search=${payload}`)
    }
  },
  getters: {
    currentBand: state => state.currentBand,
    currentAlbum: state => state.currentAlbum,
    currentLabel: state => state.currentLabel,
    albumTypes: state => state.albumTypes,
  },
  modules: {},
})
