import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Game from '../components/Game.vue'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game/:gameCode',
    name: 'Game',
    component: Game
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
