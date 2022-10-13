<template>
  <div class="dropdown dropdown-right absolute top-0 left-0 lg:hidden block">
            <label tabindex="0" class="btn m-1 p-0 w-12 bg-transparent border-color1 hover:bg-transparent hover:border-color1">
                <Icon icon="charm:menu-hamburger" class="text-2xl text-color1"/>
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border-base-300">
                <ProfileMenu class="mt-12 self-center" :isOpen="false"/>
                <li @click="this.$router.push('dashboard')"><a>Dashboard</a></li>
                <li @click="this.$router.push('cash')"><a>Kasir</a></li>
                <li @click="this.$router.push('employe')"><a>Karyawan</a></li>
                <li @click="this.$router.push('items')"><a>Barang</a></li>
                <li @click="this.$router.push('chart')"><a>Statistik</a></li>
                <li @click="this.$router.push('shop')"><a>Toko</a></li>
                <li @click="this.$router.push('login')"><a class="bg-red-500 text-white">Keluar</a></li>
            </ul>
        </div>
</template>

<script>
import ProfileMenu from '@/components/ProfileMenu.vue'

export default {
    components:{ProfileMenu}
}
</script>

<style>

</style>