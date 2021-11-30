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
    path: '/band/add',
    name: 'Add band',
    component: () => import(/* webpackChunkName: "AddBand" */ '../views/band/Add'),
  },
  {
    path: '/band/:id',
    name: 'Band Info',
    component: () => import(/* webpackChunkName: "BandInfo" */ '../views/band/Info'),
  },
  {
    path: '/album/add',
    name: 'Add album',
    component: () => import(/* webpackChunkName: "AddBand" */ '../views/album/Add'),
  },
  {
    path: '/album/:id',
    name: 'Album Info',
    component: () => import(/* webpackChunkName: "AlbumInfo" */ '../views/album/Info')
  },
  {
    path: '/label/add',
    name: 'Add label',
    component: () => import(/* webpackChunkName: "AddBand" */ '../views/label/Add'),
  },
  {
    path: '/label/:id',
    name: 'Label Info',
    component: () => import(/* webpackChunkName: "LabelInfo" */ '../views/label/Info')
  },
  {
    path: '/person/:id',
    name: 'Person Info',
    component: () => import(/* webpackChunkName: "PersonInfo" */ '../views/person/Info')
  },
]

const router = new VueRouter({
  routes
})

export default router
