<template>
<div class="lg:block flex justify-center">
   <router-link to="/">
      <img src="../assets/logo-black.png" alt="" width="130" class="absolute top-5 left-5 hidden lg:block">
   </router-link>
   <div class="lg:ml-40 lg:mt-28 mt-20 flex flex-col w-3/4 lg:w-1/4">
      <router-link to="/" class="self-center">
         <img src="../assets/logo-black.png" alt="" class="lg:hidden w-40  mb-10">
      </router-link>
      <h1 class="text-4xl font-bold self-center lg:self-start">Buat Akun Baru</h1>
      <div class="flex flex-col gap-3 mt-5">
         <Input nama="username" type="text" @onInput="onInput($event,'username')"/>
         <Input nama="password" type="password" :statusName="statusName" :status="status" @onInput="onInput($event,'password')"/>
         <Input nama="confirmasi password" type="password" @onInput="onInput($event,'confirmPass')"/>
      </div>
      <button class="btn mt-5 bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="clickBtn('buat')" ref="button">Buat Akun</button>
      <p class="text-center mt-3">Sudah memiliki akun ? <span class="font-bold hover:cursor-pointer hover:text-color1" @click="this.$router.push('/login')">Masuk</span></p>
   </div>
   <img src="../assets/ilustrasi2.svg" alt="" class="absolute right-20 top-40 w-1/3 lg:block hidden">
</div>
</template>

<script>
import Input from '@/components/Input.vue'
import axios from 'axios'

export default {
   data(){
      return{
         username:'',
         password:'',
         confirmPass:'',
         statusName:'',
         status:''
      }
   },
   components:{Input},
   methods:{
      async clickBtn(menu){
         if (menu == 'buat'){
            try {               
               const result = await this.createAcc
               this.$swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'akun berhasil dibuat',
                  showConfirmButton: false,
                  timer: 1500
               }).then(() => {
                  this.$router.push('/login')
               })
            } catch (error) {
                  const data = error.response.data
                  this.$swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: data.status,
                  text:data.msg,
                  showConfirmButton: false,
                  timer: 2000
               }).then(() => {
                  this.$router.push('/register')
               })
            }

         }
      },
      onInput(val,name){
         if (name == 'username') this.username = val
         if (name == 'password') {
            this.password = val
            if (val.length == 0) {
               this.status = ''
               this.statusName = ''
            }
            if (val.length > 0 && val.length < 3) {
               this.status = 'badge badge-error'
               this.statusName = 'lemah'
            }
            if (val.length > 3 && val.length < 8 ) {
               this.status = 'badge badge-warning'
               this.statusName = 'sedang'
            }
            if (val.length > 8 ) {
               this.status = 'badge badge-success'
               this.statusName = 'kuat'
            }
         }
         if (name == 'confirmPass')this.confirmPass = val
         if (this.confirmPass == this.password && this.confirmPass.length !== 0){
            const button = this.$refs.button
            button.disabled = false
         }
      }
   },
   mounted(){
      const button = this.$refs.button
      button.setAttribute('disabled',true)
   },
   computed:{
      async createAcc(){
         const result = await axios.post('https://aiycashier.herokuapp.com/register',{
            username : this.username,
            password : this.password
         })

         return result
      }
   }
}
</script>

<style>

</style>