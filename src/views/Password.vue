<template>
  <div class="flex">
    <Navbar />
    <NavMobile />
    <div class="lg:w-full w-screen flex flex-col items-center">
      <!-- content -->
      <h1 class="text-4xl font-bold mt-28">Ganti Password</h1>

      <div class="w-3/4 lg:w-1/3 flex flex-col gap-3 mt-10">
        <Input nama="Password Lama" ref="lama" type="password"/>
        <Input nama="Password Baru" ref="baru" type="password"/>
        <button
          class="btn mt-5 w-full bg-color1 border-color1 hover:bg-color2 hover:border-color2"
          @click="changePass"
        >
          Ganti Password
        </button>
        <button class="btn w-full" @click="this.$router.go(-1)">
          Kembali
        </button>
      </div>

      <div
        v-show="isLoad"
        class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-10"
      ></div>
      <Icon
        v-show="isLoad"
        icon="line-md:loading-loop"
        class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Input from "@/components/Input.vue";
import NavMobile from "@/components/NavMobile.vue";
import axios from "axios";
import path from "../utils/path.js";
import img from '../assets/defaut-shop.svg'

export default{
    data(){
        return{
            isLoad : false
        }
    },
    components: { Navbar, Input, NavMobile },
    methods:{
        changePass(){
            const token = JSON.parse(localStorage.getItem('token'))
            const ref = this.$refs
            const oldPass = ref.lama.$refs.input.value
            const newPass = ref.baru.$refs.input.value
            this.isLoad = true
            axios.put(`${path}validate/password/${token}`,{pass:oldPass,newPass})
            .then(res => {
                const data = res.data
                let icon 
                if (data.isSuccess) icon = 'success'
                else icon = 'error'
                this.$swal.fire({
                    position: 'center',
                    icon: icon,
                    title: data.status,
                    text:data.msg,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.isLoad = false
                    if (data.isSuccess) this.$router.push('/dashboard')
                    else {
                        ref.lama.$refs.input.value = ''
                        ref.baru.$refs.input.value = ''
                        this.$router.push('/password')
                    }
                })
            })
        }
    }
}
</script>