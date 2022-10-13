<template>
  <nav class="lg:w-16 bg-color1 h-screen hidden lg:flex flex-col gap-5 hover:lg:w-40 transition-all duration-300" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
    <ProfileMenu class="mt-12 self-center" :isOpen="isOpen"/>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('dashboard')">
        <Icon icon="ant-design:home-filled" class="text-2xl"/>
        <span v-show="isOpen">Dashboard</span>
    </div>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('cash')">
        <Icon icon="fa-solid:cash-register" class="text-2xl"/>
        <span v-show="isOpen">Kasir</span>
    </div>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('employe')">
        <Icon icon="clarity:employee-group-solid" class="text-2xl" />
        <span v-show="isOpen">Karyawan</span>
    </div>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('items')">
        <Icon icon="akar-icons:shipping-box-01" class="text-2xl"/>
        <span v-show="isOpen">Barang</span>
    </div>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('chart')">
        <Icon icon="ant-design:bar-chart-outlined" class="text-2xl"/>
        <span v-show="isOpen">Statistik</span>
    </div>
    <div class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer" @click="this.$router.push('shop')">
        <Icon icon="entypo:shop" class="text-2xl"/>
        <span v-show="isOpen">Shop</span>
    </div>
  </nav>
</template>

<script>
import ProfileMenu from '@/components/ProfileMenu.vue'

export default {
    data(){
        return{
            isOpen:false
        }
    },
    components:{ProfileMenu}
}
</script>

<style>

</style>