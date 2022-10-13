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
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
