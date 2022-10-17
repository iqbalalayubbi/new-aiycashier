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
            <h1 class="text-xl lg:text-4xl font-bold mt-10">Tambah Karyawan</h1>
            <div class="avatar mt-5">
                <div class="w-24 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <div class="w-[90%] lg:w-1/3 flex flex-col gap-3 mt-10">
                <Input nama="username" type="text" ref="username"/>
                <Input nama="password" type="password" ref="password"/>
                <select class="select border-color1 mt-3 focus:outline-color1" ref="role">
                    <option disabled selected>kasir</option>
                    <option>kasir</option>
                    <option>pengelola</option>
                </select>
                <button class="btn mt-5 w-full bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="clickBtn('simpan')">Simpan</button> 
                <button class="btn w-full" @click="clickBtn('kembali')">Kembali</button> 
            </div>
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
            isLoad : false
        }
    },
    components:{Navbar,Input},
    methods:{
        clickBtn(menu){
            if (menu == 'simpan'){
                const ref = this.$refs
                const username = ref.username.$refs.input.value
                const password = ref.password.$refs.input.value
                const role = this.$refs.role.value

                this.isLoad = true
                const token = JSON.parse(localStorage.getItem('token'))
                axios.post(`https://aiycashier.herokuapp.com/employe/${token}`,{
                    username,password,role
                })
                .finally(() => this.isLoad = false)
                .then(res => {
                    const result = res.data
                    if (result.isSuccess){
                        this.$swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: result.status,
                        text:result.msg,
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => this.$router.push('/employe'))
                    }
                })

            }
            else if(menu == 'kembali'){
                this.$router.push('/employe')
            }
        }
    }
}   
</script>

<style>

</style>