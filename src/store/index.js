import Vue from 'vue'
import Vuex from 'vuex'

import personModule from '@/store/modules/person'
import bandModule from '@/store/modules/band'
import albumModule from '@/store/modules/album'
import labelModule from '@/store/modules/label'
import countryModule from '@/store/modules/country'
import userModule from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    albumTypes: ['Full-length', 'EP', 'Single', 'Demo', 'Compilation', 'Split'],
    linkTypes: ['Official site', 'Facebook', 'Instagram', 'Twitter', 'Spotify', 'Youtube', 'Band in town', 'Bandcamp',
      'Discogs', 'Wikipedia', 'Telegram', 'VK'],
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
    },
    token: null,
  },
  mutations: {
    getToken(state) {
      const token = localStorage.getItem('token')
      if (token) {
        state.token = token
      }
    }
  },
  actions: {
    axiosErrorHandler(context, error) {
      Vue.$toast.error(error.response.data.message)
    }
  },
  getters: {
    token: state => state.token,
    albumTypes: state => state.albumTypes,
    linkTypes: state => state.linkTypes,
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
  modules: {
    person: personModule,
    band: bandModule,
    album: albumModule,
    label: labelModule,
    country: countryModule,
    user: userModule,
  },
})
