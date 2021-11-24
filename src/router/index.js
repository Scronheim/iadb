import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/band/:id',
    name: 'Band Info',
    component: () => import(/* webpackChunkName: "BandInfo" */ '../views/BandInfo.vue'),
  },
  {
    path: '/album/:id',
    name: 'Album Info',
    component: () => import(/* webpackChunkName: "AlbumInfo" */ '../views/AlbumInfo')}
]

const router = new VueRouter({
  routes
})

export default router
