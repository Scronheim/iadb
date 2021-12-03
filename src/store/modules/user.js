import router from '../../router/index'
import axios from 'axios'

const userModule = {
  state: () => ({
    user: {
      username: null,
      email: null,
      avatar: null,
      roles: [],
      likedAlbumIds: [],
      likedAlbums: [],
      listenListIds: [],
    },
  }),
  mutations: {
    addToListenList(state, id) {
      state.user.listenListIds.push(id)
    },
    removeFromListenList(state, id) {
      const index = state.user.listenListIds.findIndex((i) => {
        return i === id
      })
      if (index > -1) {
        state.user.listenListIds.splice(index, 1)
      }
    },
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
    async saveUser({state}) {
      return await axios.post('/api/user', state.user)
    },
    async aboutMe({commit}) {
      const token = localStorage.getItem('token')
      const {data} = await axios.get('/api/user/me', {headers: {'x-access-token': token}})
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
    },
    inListenList: function (state, rootState) {
      const album = state.user.listenListIds.find((i) => {
        return i === rootState.currentAlbum._id
      })
      return !!album
    }
  }
}

export default userModule
