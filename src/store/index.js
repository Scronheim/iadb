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
    async getAlbumInfo({commit}, id) {
      const {data} = await axios.get(`/api/album/id/${id}`)
      commit('setCurrentAlbum', data.data)
    },
    async getLabelInfo({commit}, id) {
      const {data} = await axios.get(`/api/label/id/${id}`)
      commit('setCurrentLabel', data.data)
    }
  },
  getters: {
    currentBand: state => state.currentBand,
    currentAlbum: state => state.currentAlbum,
    currentLabel: state => state.currentLabel,
  },
  modules: {
  },
})
