import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home-View',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register-View',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login-View',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard-View',
    component: () => import('../views/Dashboard.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
