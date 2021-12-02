import axios from 'axios'
import router from '../../router/index'

const userModule = {
  state: () => ({
    user: {
      username: null,
      email: null,
      avatar: null,
      roles: [],
      likedAlbumIds: [],
      likedAlbums: [],
    },
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    clearUser(state) {
      state.user = {
        roles: []
      }
    }
  },
  actions: {
    async aboutMe({commit}) {
      const token = localStorage.getItem('token')
      const {data} = await axios.get('/api/auth/me', {headers: {'x-access-token': token}})
      commit('setUser', data.data)
    },
    async login({commit}, payload) {
      const {data} = await axios.post('/api/auth/signin', payload)
      if (data.data.user) {
        commit('setUser', data.data.user)
        localStorage.setItem('token', data.data.token)
        axios.defaults.headers.common['x-access-token'] = data.data.token
        router.push('/')
      } else {
        localStorage.removeItem('token')
      }
    },
    register(context, payload) {
      return  axios.post('/api/auth/signup', payload)
    },
    logout({commit}) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['x-access-token']
      commit('clearUser')
    }
  },
  getters: {
    user: state => state.user,
    isLogin: state => !!state.user._id,
    isAdmin: function (state) {
      const admin = state.user.roles.find((r) => {
        return r.name === 'admin'
      })
      return !!admin
    }
  }
}

export default userModule
