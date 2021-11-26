import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentBand: {
      albums: [],
      country: {},
      label: {},
      status: 'active',
    },
    currentAlbum: {
      band: {},
      label: {},
    },
    currentLabel: {},
    albumTypes: ['Full-length', 'EP', 'Single', 'Demo', 'Compilation', 'Split'],
    statuses: {
      active: {
        color: 'green'
      },
      unknown: {
        color: 'orange'
      },
      'split-up': {
        color: 'red'
      },
      'on-hold': {
        color: 'yellow'
      },
    }
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
    },
    async searchCountry(context, payload) {
      return await axios.get(`/api/country?search=${payload}`)
    },
    async searchPeople(context, payload) {
      return await axios.get(`/api/people?search=${payload}`)
    },
    addPersonToBand(context, payload) {
      return axios.post('/api/people/band', payload)
    },
    removePersonFromBand(context, payload) {
      return axios.delete('/api/people/band', {
        headers: {},
        data: payload
      })
    }
  },
  getters: {
    currentBand: state => state.currentBand,
    currentAlbum: state => state.currentAlbum,
    currentLabel: state => state.currentLabel,
    albumTypes: state => state.albumTypes,
    yearsRange: function () {
      const currentYear = (new Date()).getFullYear()
      const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
      return range(currentYear, currentYear - 50, -1)
    },
    statuses: function (state) {
      return Object.keys(state.statuses).map((k) => {
        return {
          status: k,
          color: state.statuses[k].color
        }
      })
    },
  },
  modules: {},
})
