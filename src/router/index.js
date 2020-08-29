import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Choice from '../components/Choice.vue'
import Battle from '../components/Battle.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/choice',
    name: 'Choice',
    component: Choice
  },
  {
    path: '/battle',
    name: 'Battle',
    component: Battle,
  },
  {
    path: '*',
    redirect: 'Home'
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
