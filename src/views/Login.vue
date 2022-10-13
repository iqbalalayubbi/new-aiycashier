<template>
  <div class="flex h-screen">
    <router-link to="/">
        <img src="../assets/logo-black.png" alt="" width="130" class="absolute top-5 left-5 lg:block hidden">
    </router-link>
    <div class="w-full lg:w-1/2 flex justify-center items-center">
        <div class="w-3/4 lg:w-1/2 flex flex-col gap-3">
            <router-link to="/" class="self-center">
                <img src="../assets/logo-black.png" alt="" class="lg:hidden w-40 self-center mb-10">
            </router-link>
            <h1 class="text-4xl font-bold self-center" >Masuk</h1>
            <Input nama="username" type="text"/>
            <Input nama="password" type="password"/>
            <button class="btn mt-5 bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="clickBtn('masuk')">Masuk</button>
            <p class="text-center mt-3">Belum memiliki akun ? <span class="font-bold hover:cursor-pointer hover:text-color1" @click="this.$router.push('/register')">Daftar</span></p>
        </div>
    </div>
    <div class="bg-color1 w-1/2 h-full lg:flex items-center justify-center hidden">
        <img src="../assets/ilustrasi3.svg" alt="" class="w-3/4">
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'

export default {
    components:{Input},
    methods:{
        clickBtn(menu){
            if (menu == 'masuk'){
                this.$router.push('/shop/data')
            }
        }
    }
}
</script>

<style>

</style>