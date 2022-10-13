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
        <div class="lg:w-full w-screen">
            <div class="flex justify-around mt-12">
                <CardDash v-for="(card,i) in cards" :icon="card.icon" :key="i" :nama="card.nama" :val="card.val" class="hidden lg:flex"/>
                <SliderCard class="w-60 lg:hidden flex"/>
            </div>
            <div class="flex lg:flex-row flex-col items-center lg:justify-center mt-20 gap-5">
                <Input placeholder="cari barang . . ."  class="w-80"/>
                <Input type="date"  class="w-40"/>
            </div>
            <div class="flex justify-center mt-10"> 
                <TableTrans class="w-[90%]"/>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CardDash from '@/components/CardDash.vue'
import Input from '@/components/Input.vue'
import TableTrans from '@/components/TableTrans.vue'
import SliderCard from '@/components/SliderCard.vue'
import ProfileMenu from '@/components/ProfileMenu.vue'

export default {
    components:{Navbar,CardDash,Input,TableTrans,SliderCard,ProfileMenu},
    data(){
        return{
            cards:[
                {
                    icon:'ant-design:line-chart-outlined',
                    nama:'Untung',
                    val:'Rp20.000'
                },
                {
                    icon:'carbon:report',
                    nama:'Terjual',
                    val:'Rp20.000'
                },
                {
                    icon:'akar-icons:shipping-box-01',
                    nama:'Barang',
                    val:'Rp20.000'
                }
            ]
        }
    }
}
</script>

<style>

</style>