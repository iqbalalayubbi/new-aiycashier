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
        <div class="lg:w-full w-screen flex flex-col items-center" v-show="finish">
            <!-- content -->
            <h1 class="text-4xl font-bold mt-10">Ubah Barang</h1>
            <div class="avatar mt-5">
                <div class="w-24 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <div ref="item" v-for="(item,i) in items" :key="i" class="flex w-3/4 justify-center gap-5">
                <div class="w-1/3 flex flex-col gap-3 mt-10">
                    <Input nama="nama Barang" ref="nama" :val="item.nama" @onInput="onInput($event,'nama')"/>
                    <Input nama="kategori" ref="kategori" :val="item.kategori" @onInput="onInput($event,'kategori')"/>
                    <Input nama="satuan" ref="satuan" :val="item.satuan" @onInput="onInput($event,'satuan')"/>
                </div>
                <div class="w-1/3 flex flex-col gap-3 mt-10">
                    <Input nama="modal" ref="modal" :val="item.modal" @onInput="onInput($event,'modal')"/>
                    <Input nama="harga" ref="harga" :val="item.harga" @onInput="onInput($event,'harga')"/>
                    <Input nama="stok" ref="stok" :val="item.stok" @onInput="onInput($event,'stok')"/>
                </div>
            </div>
            <button class="btn mt-5 w-1/3 bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="saveItem">Simpan</button> 
            <button class="btn w-1/3 mt-5" @click="this.$router.push('/items')">Kembali</button> 
        </div>

        <!-- loading -->
        <div v-show="loadUpdate" class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-10"></div>
        <Icon v-show="loadUpdate" icon="line-md:loading-loop" class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"/>
        <LoadDetailItem v-show="isLoad" class="absolute top-20 left-10"/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Input from '@/components/Input.vue'
import LoadDetailItem from '@/components/LoadDetailItem.vue'
import axios from 'axios'

export default {
    data(){
        return{
            items:[],
            isLoad :true,
            finish : false,
            item:{},
            loadUpdate:false
        }
    },
    methods:{
        saveItem(){
            const id = this.$route.params.id
            const token = JSON.parse(localStorage.getItem('token')) 
            this.loadUpdate = true
            axios.put(`https://aiycashier.herokuapp.com/${id}/${token}`,this.item)
                .finally(() => {
                    this.$swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'item berhasil di ubah',
                        showConfirmButton: false,
                        timer: 500
                    }).then(() => {
                        this.loadUpdate = false
                        this.$router.push('/items')
                    })
                    
                })
        },
        onInput(val,input,$event){
            if (input == 'nama')this.item.nama = val
            if (input == 'kategori')this.item.kategori = val
            if (input == 'satuan')this.item.satuan = val
            if (input == 'modal')this.item.modal = val
            if (input == 'harga')this.item.harga = val
            if (input == 'stok')this.item.stok = val
        }
    },
    components:{Navbar,Input,LoadDetailItem},
    created(){
        const id = this.$route.params.id
        const token = JSON.parse(localStorage.getItem('token')) 
        axios.get(`https://aiycashier.herokuapp.com/${id}/${token}`)
            .finally(() => {
                this.isLoad = false
                this.finish = true
            
            })
            .then(res => {
                const result = res.data
                this.items = result
            })
    }
}
</script>

