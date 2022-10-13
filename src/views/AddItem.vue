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
            <h1 class="text-4xl font-bold mt-10">Tambah Barang</h1>
            <div class="avatar mt-5">
                <div class="w-24 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <div class="flex w-3/4 justify-center gap-5">
                <div class="w-1/3 flex flex-col gap-3 mt-10">
                    <Input nama="nama Barang"/>
                    <Input nama="kategori"/>
                    <Input nama="satuan"/>
                </div>
                <div class="w-1/3 flex flex-col gap-3 mt-10">
                    <Input nama="modal"/>
                    <Input nama="harga"/>
                    <Input nama="stok"/>
                </div>
            </div>
            <button class="btn mt-5 w-1/3 bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="this.$router.go(-1)">Simpan</button> 
            <button class="btn w-1/3 mt-5" @click="this.$router.go(-1)">Kembali</button> 
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Input from '@/components/Input.vue'

export default {
    components:{Navbar,Input},
}
</script>

<style>

</style>