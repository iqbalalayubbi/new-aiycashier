<template>
    <div class="flex">
        <Navbar/>
        <NavMobile/>
        <div class="lg:w-full w-screen">
            <!-- content -->
            <div class="flex items-center mt-10 flex-col ">

                <div class="border-color1 lg:mt-0 mt-10 border-2 lg:w-1/2 w-[70%] h-16 lg:h-28 rounded-xl flex justify-end items-center px-5">
                    <h1 class="text-xl lg:text-4xl text-color1">Rp{{total}}</h1>
                </div>

                <div class="form-control mt-10 lg:w-1/2 w-3/4">
                    <div class="input-group w-full">
                        <input type="text" placeholder="Cari Barang…" class="input input-bordered w-full" />
                        <button class="btn btn-square bg-color1 border-color1 hover:bg-color2 hover:border-color2">
                            <Icon icon="akar-icons:search"  class="text-xl"/>
                        </button>
                    </div>
                </div>

                <TableCash class="mt-5 w-3/4"/>

                <button class="btn mt-10 w-3/4 lg:w-1/2 bg-color1 border-color1 hover:bg-color2 hover:border-color2">Bayar</button> 
            </div>

        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Input from '@/components/Input.vue'
import TableCash from '@/components/TableCash.vue'
import NavMobile from '@/components/NavMobile.vue'

export default {
    data(){
        return{
            total:0
        }
    },
    components:{Navbar,Input,TableCash,NavMobile},
}
</script>

<style>

</style>