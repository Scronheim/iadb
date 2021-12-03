import axios from 'axios'
import store from '../store/index'

export default function setup() {
  axios.interceptors.request.use((config) => {
    const token = store.getters.token
    if (token) {
      config.headers['x-access-token'] = token
    }
    return config
  }, (err) => {
    return Promise.reject(err)
  })
}
