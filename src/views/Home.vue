<template>
  <div>
    <Navbar class="fixed top-0 transition-all duration-300" :class="[isScroll ? 'bg-base-300 z-10' : 'bg-transparent text-white']"/>
    <Beranda/>
    <DataApp class="lg:mt-96 mt-60"/>
    <Fitur class="mt-40"/>
    <CardFitur class="mt-10"/>
    <Tentang class="mt-40"/>
    <Footer class="mt-40"/>
  </div>
</template>

<script>
import Navbar from '@/components/NavbarHome.vue'
import Beranda from '@/components/Beranda.vue'
import DataApp from '@/components/DataApp.vue'
import Fitur from '@/components/Fitur.vue'
import CardFitur from '@/components/CardFitur.vue'
import Tentang from '@/components/Tentang.vue'
import Footer from '@/components/Footer.vue'

export default {
    name:'Navbar-Comp',
    components:{Navbar,Beranda,DataApp,Fitur,CardFitur,Tentang,Footer},
    methods:{
        onScroll(){
            window.scrollY > 300 ? this.isScroll = true : this.isScroll = false
        }
    },
    created(){
        window.addEventListener('scroll',this.onScroll)
    },
    data(){
        return{
            isScroll : false
        }
    }
}
</script>

<style>

</style>