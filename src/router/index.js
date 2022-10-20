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
    path: '/kasir',
    name: 'Cash-View',
    component: () => import('../views/Cash.vue')
  },
  {
    path: '/karyawan',
    name: 'Employe-View',
    component: () => import('../views/Employe.vue')
  },
  {
    path: '/barang',
    name: 'Items-View',
    component: () => import('../views/Items.vue')
  },
  {
    path: '/toko',
    name: 'Shop-View',
    component: () => import('../views/Shop.vue')
  },
  {
    path: '/barang/tambah',
    name: 'AddItem-View',
    component: () => import('../views/AddItem.vue')
  },
  {
    path: '/karyawan/tambah',
    name: 'AddEmploye-View',
    component: () => import('../views/AddEmploye.vue')
  },
  {
    path: '/toko/data',
    name: 'DataShop-View',
    component: () => import('../views/DataShop.vue')
  },
  {
    path: '/statistik',
    name: 'Chart-View',
    component: () => import('../views/Chart.vue')
  },
  {
    path: '/barang/:id',
    name: 'DetailItem-View',
    component: () => import('../views/DetailItem.vue')
  },
  {
    path: '/karyawan/:id',
    name: 'DetailEmploye-View',
    component: () => import('../views/DetailEmploye.vue')
  },
  {
    path: '/profile',
    name: 'Profile-View',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/upload',
    name: 'Upload-View',
    component: () => import('../views/Upload.vue')
  },
  {
    path: '/password',
    name: 'Password-View',
    component: () => import('../views/Password.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
