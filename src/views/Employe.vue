<template>
    <div class="flex">
        <Navbar/>
        <NavMobile/>
        <div class="lg:w-full w-screen flex flex-col items-center">
            <div class="form-control mt-20 lg:mt-10 lg:w-1/2 w-3/4 ">
               <div class="input-group w-full">
                  <input type="text" placeholder="username atau nama…" class="input input-bordered w-full" />
                  <button class="btn btn-square bg-color1 border-color1 hover:bg-color2 hover:border-color2">
                     <Icon icon="akar-icons:search"  class="text-xl"/>
                  </button>
               </div>
            </div>
            <TableEmploye class="w-[90%] lg:w-3/4 mt-5"/>
            <button class="btn mt-10 w-1/2 bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="this.$router.push('/employe/add')">Tambah Karyawan</button>
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
    components:{Navbar,Input,ProfileMenu,TableEmploye,NavMobile},
    created(){
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get(`https://aiycashier.herokuapp.com/${token}`).then(res => {
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