<template>
    <div>
        <div class="bg-color1 absolute top-0 left-0 z-[-1] h-screen w-full lg:hidden">
        </div>
        <img src="../assets/bg-texture.svg" alt="" class="absolute top-0 left-0 z-[-1] lg:block hidden">
        <div class="mt-36 ml-10 ">
            <h1 class="lg:text-4xl font-bold text-white text-2xl">Buka Toko Online  Digital <br>Pertamamu</h1>
            <p class="w-[80%] lg:w-1/3 mt-10 text-white">buka usahamu mulai dari nol dan lakukanlah transaksi sebanyak mungkin untuk mendapatkan keuntungan maksimal</p>
            <router-link to="/register">
                <button class="btn bg-transparent border-[1px] border-white hover:bg-blue-600 hover:border-blue-600 mt-5">Buat Akun</button>
            
            </router-link>
            <img src="../assets/ilustrasi.svg" alt="" class="absolute lg:right-40 bottom-0 right-0 lg:top-40 lg:w-[400px] w-3/4">
        </div>
    </div>
</template>

<script>
export default {
    name:'Beranda-Comp'
}
</script>

<style>

</style>