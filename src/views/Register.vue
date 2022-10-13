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
         <Input nama="username" type="text"/>
         <Input nama="password" type="password"/>
         <Input nama="confirmasi password" type="password"/>
      </div>
      <button class="btn mt-5 bg-color1 border-color1 hover:bg-color2 hover:border-color2">Buat Akun</button>
      <p class="text-center mt-3">Sudah memiliki akun ? <span class="font-bold" @click="this.$router.push('/login')">Masuk</span></p>
   </div>
   <img src="../assets/ilustrasi2.svg" alt="" class="absolute right-20 top-40 w-1/3 lg:block hidden">
</div>
</template>

<script>
import Input from '@/components/Input.vue'

export default {
    components:{Input}
}
</script>

<style>

</style>