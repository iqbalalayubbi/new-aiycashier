<template>
    <div class="flex">
        <Navbar/>
        <NavMobile/>
        <div class="lg:w-full w-screen flex flex-col items-center">
            <!-- content -->
            <div class="form-control mt-20 lg:mt-10 w-3/4 lg:w-1/2 relative">
                <div class="input-group w-full">
                    <input type="text" placeholder="Cari Barang…" class="input input-bordered w-full" @input="onInput"/>
                    <button class="btn btn-square bg-color1 border-color1 hover:bg-color2 hover:border-color2">
                        <Icon icon="akar-icons:search"  class="text-xl"/>
                    </button>
                </div>
                <ul class="menu bg-base-100 p-2 rounded-box border-2 border-base-300 w-full absolute top-12 z-[99]" v-show="isInput">
                    <li v-for="(item,i) in items" :key="i"><a :class="[i == 0 ? 'bg-base-300' : '']">{{item}}</a></li>
                </ul>
            </div>

            <TableItems class="w-[90%] lg:w-3/4 mt-10" :items="items"/>

            <button class="btn mt-10 w-1/2 bg-color1 border-color1 hover:bg-color2 hover:border-color2" @click="this.$router.push('items/add')">Tambah Barang</button> 

        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import TableItems from '@/components/TableItems.vue'
import NavMobile from '@/components/NavMobile.vue'
import axios from 'axios'

export default {
    data(){
        return{
            isInput:false,
            items:[],
            data:[],
        }
    },
    components:{Navbar,TableItems,NavMobile},
    methods:{
        onInput(e){
            const val = e.target.value
            const found = []
            this.data.forEach(item => {
                if (item.nama.startsWith(val)){
                    found.push(item)
                }
            })
            this.items = found
        }
    },
    created(){
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get(`https://aiycashier.herokuapp.com/${token}`).then(res => {
            const data = res.data.data
            const role = data.role
            if (role == 'kasir') {
                this.$router.push('/dashboard')
            }
        })

        axios.get(`https://aiycashier.herokuapp.com/items/${token}`).then(res => {
            const items = res.data.data
            this.items = items
            this.data = items
        })
    }
}
</script>

<style>

</style>