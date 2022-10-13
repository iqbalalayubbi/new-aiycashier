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
  {
    path: '/cash',
    name: 'Cash-View',
    component: () => import('../views/Cash.vue')
  },
  {
    path: '/employe',
    name: 'Employe-View',
    component: () => import('../views/Employe.vue')
  },
  {
    path: '/items',
    name: 'Items-View',
    component: () => import('../views/Items.vue')
  },
  {
    path: '/shop',
    name: 'Shop-View',
    component: () => import('../views/Shop.vue')
  },
  {
    path: '/items/add',
    name: 'AddItem-View',
    component: () => import('../views/AddItem.vue')
  },
  {
    path: '/employe/add',
    name: 'AddEmploye-View',
    component: () => import('../views/AddEmploye.vue')
  },
  {
    path: '/shop/data',
    name: 'DataShop-View',
    component: () => import('../views/DataShop.vue')
  },
  {
    path: '/chart',
    name: 'Chart-View',
    component: () => import('../views/Chart.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
