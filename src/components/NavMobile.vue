<template>
  <div class="dropdown dropdown-right absolute top-0 left-0 lg:hidden block">
            <label tabindex="0" class="btn m-1 p-0 w-12 bg-transparent border-color1 hover:bg-transparent hover:border-color1">
                <Icon icon="charm:menu-hamburger" class="text-2xl text-color1"/>
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border-base-300">
                <ProfileMenu class="mt-12 self-center" :isOpen="false"/>
                <li v-for="(menu,i) in nav" :key="i" @click="this.$router.push(menu.link)"><a>{{menu.nama}}</a></li>
                <!-- <li @click="this.$router.push('cash')"><a>Kasir</a></li>
                <li @click="this.$router.push('employe')"><a>Karyawan</a></li>
                <li @click="this.$router.push('items')"><a>Barang</a></li>
                <li @click="this.$router.push('chart')"><a>Statistik</a></li>
                <li @click="this.$router.push('shop')"><a>Toko</a></li> -->
                <li @click="logout"><a class="bg-red-500 text-white">Keluar</a></li>
            </ul>
        </div>
</template>

<script>
import ProfileMenu from '@/components/ProfileMenu.vue'
import axios from 'axios'

export default {
    data(){
        return{
            nav:[],
            allMenu:[
                {nama:'Dashboard',link:'dashboard'},
                {nama:'Kasir',link:'cash'},
                {nama:'Karyawan',link:'employe'},
                {nama:'Barang',link:'items'},
                {nama:'Statistik',link:'chart'},
                {nama:'Toko',link:'shop'},
            ]
        }
    },
    components:{ProfileMenu},
    methods:{
        logout(){
            localStorage.removeItem('token')
            this.$router.push('login')
        }
    },
    created(){
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get(`https://aiycashier.herokuapp.com/${token}`).then(res => {
            const result = res.data.data
            const role = result.role
            if (role == 'admin'){
                this.nav = this.allMenu 
            }else if (role == 'pengelola'){
                this.nav[0] = this.allMenu[0] 
                this.nav[1] = this.allMenu[1] 
                this.nav[2] = this.allMenu[3] 
            }else if (role == 'kasir'){
                this.nav[0] = this.allMenu[0] 
                this.nav[1] = this.allMenu[1] 
            }
        })
    }
}
</script>

<style>

</style>