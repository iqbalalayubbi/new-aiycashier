<template>
  <div>
    <Navbar class="fixed top-0 transition-all duration-300" :class="[isScroll ? 'bg-base-300 z-10' : 'bg-transparent text-white']" @clickMenu="clickMenu" @menuMobile="menuMobile"/>
    <Beranda/>
    <DataApp class="lg:mt-96 mt-[420px] md:mt-[700px]"/>
    <Fitur class="lg:mt-40 mt-20" id="fitur"/>
    <CardFitur class="mt-10"/>
    <Tentang class="mt-40" id="tentang"/>
    <Footer class="mt-40" @clickMenu="clickMenu"/>
  
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
            window.scrollY > 100 ? this.isScroll = true : this.isScroll = false
        },
        clickMenu(menu){
            let top
            const behavior = 'smooth'
            if (menu == 'beranda')top = 0
            if (menu == 'fitur')top = 937
            if (menu == 'tentang')top = 1414
            window.scrollTo({top,behavior})
        },
        menuMobile(menu){
            let top
            const behavior = 'smooth'
            if (menu == 'beranda')top = 0
            if (menu == 'fitur')top = 900
            if (menu == 'tentang')top = 1600
            window.scrollTo({top,behavior})
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