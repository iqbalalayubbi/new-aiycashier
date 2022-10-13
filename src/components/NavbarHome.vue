<template>
  <div class="navbar">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
        <li><a>Beranda</a></li>
        <li><a>Fitur</a></li>
        <li><a>Tentang</a></li>
      </ul>
    </div>
      <img :src="src" ref="logo" alt="" width="120" class="ml-5 lg:block hidden">
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal p-0">
        <li><a>Beranda</a></li>
        <li><a>Fitur</a></li>
        <li><a>Tentang</a></li>
    </ul>
  </div>
  <div class="navbar-end flex gap-2 lg:gap-5">
    <router-link to="/register"><a class="btn">Daftar</a></router-link>
    <router-link to="/login">
      <a class="btn bg-transparent border-none hover:bg-blue-600" :class="[isScroll ? 'text-slate-600' : 'text-white']">Masuk</a>
    </router-link>
  </div>
</div>
</template>

<script>
import logo1 from '../assets/logo2.svg'
import logo2 from '../assets/logo-black.png'

export default {
  data(){
    return{
      isScroll:false,
      logo:{
        logoWhite: logo1,
        logoBlack: logo2,
      },
      src:logo1
    }
  },
  methods:{
    onScroll(){
        if (window.scrollY > 300){
          this.isScroll = true
          this.src = this.logo.logoBlack
        }else{
          this.isScroll = false
          this.src = this.logo.logoWhite
        }
    }
  },
  created(){
    window.addEventListener('scroll',this.onScroll)
  }
}
</script>

<style>

</style>