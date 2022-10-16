<template>
  <div class="flex h-screen">
    <router-link to="/">
        <img src="../assets/logo-black.png" alt="" width="130" class="absolute top-5 left-5 lg:block hidden">
    </router-link>
    <div class="w-full flex flex-col items-center">
        <div class="w-3/4 lg:w-1/3 flex flex-col gap-5">
            <router-link to="/" class="self-center mt-20">
                <img src="../assets/logo-black.png" alt="" class="lg:hidden w-40 self-center mb-10">
            </router-link>
            <h1 class="text-4xl font-bold self-center">Buka Toko Baru</h1>
            <Input nama="username" type="text" ref="username"/>
            <Input nama="nama toko" type="text" ref="nama"/>
            <Input nama="alamat" type="text" ref="alamat"/>
            <button class="btn mt-5 bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="clickBtn()">Masuk</button>
        </div>
    </div>
    <div v-show="isLoad" class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-10"></div>
    <Icon v-show="isLoad" icon="line-md:loading-loop" class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"/>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'
import axios from 'axios'

export default {
    data(){
        return{
            isLoad:false
        }
    },
    components:{Input},
    methods:{
        clickBtn(){
            const ref = this.$refs
            const username = ref.username.$refs.input.value
            const nama = ref.nama.$refs.input.value
            const alamat = ref.alamat.$refs.input.value
            const token = JSON.parse(localStorage.getItem('token'))
            this.isLoad = true
            axios.post(`https://aiycashier.herokuapp.com/shop/${token}`,{
                username,nama,alamat
            })
            .finally(() => this.isLoad = false)
            .then(res => {
                const result = res.data
                console.log(result)
                if (result.isSuccess){
                    this.$swal.fire(
                        'Toko Behasil Dibuat',
                        'Mulailah atur tokomu dengan baik',
                        'success'
                    ).then(res => {
                        this.$router.push('/dashboard')
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>