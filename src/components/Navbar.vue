<template>
  <nav class="lg:w-16 bg-color1 h-screen hidden lg:flex flex-col gap-5 hover:lg:w-40 transition-all duration-300" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
    <ProfileMenu class="mt-12 self-center" :isOpen="isOpen"/>
    <div v-for="(m,i) in menu" :key="i" class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="clickMenu(m.nama)">
        <Icon :icon="m.icon" class="text-2xl"/>
        <span v-show="isOpen">{{m.nama}}</span>
    </div>
    <!-- <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('cash')">
        <Icon icon="fa-solid:cash-register" class="text-2xl"/>
        <span v-show="isOpen">Kasir</span>
    </div>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('employe')">
        <Icon icon="clarity:employee-group-solid" class="text-2xl" />
        <span v-show="isOpen">Karyawan</span>
    </div>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('items')">
        <Icon icon="akar-icons:shipping-box-01" class="text-2xl"/>
        <span v-show="isOpen">Barang</span>
    </div>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('chart')">
        <Icon icon="ant-design:bar-chart-outlined" class="text-2xl"/>
        <span v-show="isOpen">Statistik</span>
    </div>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('shop')">
        <Icon icon="entypo:shop" class="text-2xl"/>
        <span v-show="isOpen">Shop</span>
    </div> -->
  </nav>
</template>

<script>
import ProfileMenu from '@/components/ProfileMenu.vue'
import axios from 'axios'

export default {
    data(){
        return{
            isOpen:false,
            dataMenu:[
                {
                    icon : 'ant-design:home-filled',
                    nama : 'Dashboard',   
                },
                {
                    icon : 'fa-solid:cash-register',
                    nama : 'Kasir',   
                },
                {
                    icon : 'clarity:employee-group-solid',
                    nama : 'Karyawan',   
                },
                {
                    icon : 'akar-icons:shipping-box-01',
                    nama : 'Barang',   
                },
                {
                    icon : 'ant-design:bar-chart-outlined',
                    nama : 'Statistik',   
                },
                {
                    icon : 'entypo:shop',
                    nama : 'Shop',   
                },
            ],
            menu:[]
        }
    },
    methods:{
        clickMenu(menu){
            const nav = menu.toLowerCase()
            if (nav == 'dashboard') this.$router.push('/dashboard')
            if (nav == 'kasir') this.$router.push('/cash')
            if (nav == 'karyawan') this.$router.push('/employe')
            if (nav == 'barang') this.$router.push('/items')
            if (nav == 'statistik') this.$router.push('/chart')
            if (nav == 'shop') this.$router.push('/shop')
        }
    },
    components:{ProfileMenu},
    created(){
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get(`https://aiycashier.herokuapp.com/${token}`)
        .then(res => {
            const data = res.data.data
            const role = data.role
            console.log(role)
            if (role == 'admin') this.menu = this.dataMenu
            if (role == 'kasir') {
                this.menu[0] = this.dataMenu[0]
                this.menu[1] = this.dataMenu[1]
            }
            if (role == 'pengelola'){
                console.log('benar')
                this.menu[0] = this.dataMenu[0]
                this.menu[1] = this.dataMenu[1]
                this.menu[2] = this.dataMenu[3]
                this.menu[3] = this.dataMenu[4]
            }
        })
    }
}
</script>

<style>

</style>