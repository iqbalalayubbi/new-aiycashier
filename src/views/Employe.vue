<template>
    <div class="flex">
        <Navbar/>
        <NavMobile/>
        <div class="lg:w-full w-screen flex flex-col items-center">
            <div class="form-control mt-20 lg:mt-10 lg:w-1/2 w-3/4 ">
               <div class="input-group w-full">
                  <input type="text" placeholder="username" class="input input-bordered w-full" @input="onInput"/>
                  <button class="btn btn-square bg-color1 border-color1 hover:bg-color2 hover:border-color2">
                     <Icon icon="akar-icons:search"  class="text-xl"/>
                  </button>
               </div>
            </div>
            <TableEmploye class="w-[90%] lg:w-3/4 mt-5" ref="table"/>
            <span v-show="notFound" class="text-xl mt-5">karyawan tidak ditemukan </span>
            <button class="btn mt-10 w-1/2 bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="this.$router.push('/employe/add')">Tambah Karyawan</button>
            <div v-show="isLoad" class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-[20]"></div>
            <Icon v-show="isLoad" icon="line-md:loading-loop" class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"/>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Input from '@/components/Input.vue'
import ProfileMenu from '@/components/ProfileMenu.vue'
import TableEmploye from '@/components/TableEmploye.vue'
import NavMobile from '@/components/NavMobile.vue'
import axios from 'axios'

export default {
    data(){
        return{
            isLoad:false,
            employes:[],
            dataEmployes:[],
            notFound:false
        }
    },
    methods:{
        onInput(e){
            const val = e.target.value.toLowerCase()
            const tableRef = this.$refs.table
            const employes = tableRef.dataEmployes
            this.dataEmployes = employes
            const findEmploye = []
            this.dataEmployes.forEach(employe => {
                if(employe.username.toLowerCase().startsWith(val)) findEmploye.push(employe)
            })
            tableRef.employes = findEmploye
            if (findEmploye.length == 0) this.notFound = true
            else this.notFound = false
        }
    },
    components:{Navbar,Input,ProfileMenu,TableEmploye,NavMobile},
    created(){
        this.isLoad = true
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get(`https://aiycashier.herokuapp.com/${token}`)
        .finally(() => this.isLoad = false)
        .then(res => {
            const data = res.data.data
            const role = data.role
            if (role == 'kasir' || role == 'pengelola') {
                this.$router.push('/dashboard')
            }
        })
    }
}
</script>

<style>

</style>