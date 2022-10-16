<template>
    <div class="flex">
        <Navbar/>
        <div class="dropdown dropdown-right absolute top-0 left-0 lg:hidden block">
            <label tabindex="0" class="btn m-1 p-0 w-12 bg-transparent border-color1 hover:bg-transparent hover:border-color1">
                <Icon icon="charm:menu-hamburger" class="text-2xl text-color1"/>
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border-base-300">
                <ProfileMenu class="mt-12 self-center" :isOpen="false"/>
                <li><a>Dashboard</a></li>
                <li><a>Kasir</a></li>
                <li><a>Karyawan</a></li>
                <li><a>Barang</a></li>
                <li><a>Statistik</a></li>
            </ul>
        </div>
        <div class="lg:w-full w-screen flex flex-col items-center">
            <!-- content -->
            <h1 class="text-4xl font-bold mt-10">Profil</h1>
            <div class="avatar mt-5">
                <div class="w-24 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <div class="flex w-3/4 justify-center gap-5">
                <div class="w-1/3 flex flex-col gap-3 mt-10">
                    <Input nama="username" ref="nama" :val="user.username"/>
                    <Input nama="nama" ref="nama" :val="user.nama"/>
                    <Input nama="no hp" ref="noHp" :val="user.no_hp"/>
                </div>
                <div class="w-1/3 flex flex-col gap-3 mt-10">
                    <Input nama="role" ref="role" :val="user.role"/>
                    <Input nama="alamat" ref="alamat"/>
                    <Input nama="stok" ref="stok"/>
                </div>
            </div>
            <button class="btn mt-5 w-1/3 bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="clickBtn('simpan')">Simpan</button> 
            <button class="btn w-1/3 mt-5" @click="this.$router.push('/items')">Kembali</button> 
        </div>
        <div v-show="isLoad" class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-10"></div>
        <Icon v-show="isLoad" icon="line-md:loading-loop" class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Input from '@/components/Input.vue'
import axios from 'axios'

export default {
    data(){
        return{
            user:[]
        }
    },
    components:{Navbar,Input},
    created(){
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get(`https://aiycashier.herokuapp.com/user/${token}`).then(res => {
            const result = res.data[0]
            this.user = result
        })
    }
}
</script>

<style>

</style>