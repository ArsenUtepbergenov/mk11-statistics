import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import(/* webpackChunkName: "statistics" */ '../views/Statistics.vue')
  },
  {
    path: '/tournament',
    name: 'tournament',
    component: () => import(/* webpackChunkName: "tournament" */ '../views/Tournament.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
