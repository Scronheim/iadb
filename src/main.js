import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false

Vue.prototype.$moment = moment

Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 3,
  newestOnTop: true,
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.7,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
})

Vue.filter('albumRating', function(id) {
  if (!id) return ''
  return store.getters.user.likedAlbumIds.find((a) => {
    return a.albumId === id
  }).rating
})

Vue.filter('albumRatingDate', function(id) {
  if (!id) return ''
  return store.getters.user.likedAlbumIds.find((a) => {
    return a.albumId === id
  }).createdAt
})

Vue.filter('humanDate', function(datetime) {
  if (!datetime) return ''
  return moment(datetime).format('MMMM Do, YYYY')
})

Vue.filter('dateOnlyYear', function(datetime) {
  if (!datetime) return ''
  return moment(datetime).format('YYYY')
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
