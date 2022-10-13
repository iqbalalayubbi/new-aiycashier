<template>
    <div class="flex">
        <Navbar/>
        <NavMobile/>
        <div class="lg:w-full w-screen flex flex-col items-center">
            <!-- content -->
            <h1 class="text-4xl font-bold mt-10">Data Toko</h1>
            <div class="avatar mt-5">
                <div class="w-24 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <div class="w-3/4 lg:w-1/3 flex flex-col gap-3 mt-10">
                <Input nama="nama toko"/>
                <Input nama="pemilik"/>
                <Input nama="alamat"/>
                <button class="btn mt-5 w-full bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="this.$router.push('dashboard')">Simpan</button> 
                <button class="btn w-full" @click="this.$router.push('dashboard')">Kembali</button> 
            </div>

        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Input from '@/components/Input.vue'
import NavMobile from '@/components/NavMobile.vue'

export default {
    components:{Navbar,Input,NavMobile},
}
</script>

<style>

</style>