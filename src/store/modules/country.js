import axios from 'axios'

const countryModule = {
  state: () => ({}),
  mutations: {},
  actions: {
    async searchCountry(context, payload) {
      return await axios.get(`/api/country?search=${payload}`)
    },
  },
  getters: {}
}

export default countryModule
