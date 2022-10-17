<template>
    <div class="flex">
        <Navbar/>
        <NavMobile/>
        <div class="lg:w-full w-screen">
            <div class="flex justify-around mt-12">
                <CardDash v-for="(card,i) in cards" :icon="card.icon" :key="i" :nama="card.nama" :val="card.val" class="hidden lg:flex"/>
                <SliderCard class="w-60 lg:hidden flex" :untung="cards[0].val" :terjual="cards[1].val" :items="cards[2].val"/>
            </div>
            <div class="flex lg:flex-row flex-col items-center lg:justify-center mt-20 gap-5">
                <Input placeholder="nama barang . . ."  class="w-80" @onInput="onInput"/>
                <Input type="date" class="w-40" ref="date" @change="onDate"/>
                <button class="btn" @click="resetDate">reset</button>
            </div>
            <div class="flex flex-col items-center mt-10"> 
                <TableTrans class="w-[90%]" :transaksi="trans"/>
                <span v-show="notFound" class="text-2xl -mt-60">transaksi tidak ditemukan </span>
            </div>
        </div>
        <div v-show="isLoad" class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-10"></div>
        <Icon v-show="isLoad" icon="line-md:loading-loop" class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CardDash from '@/components/CardDash.vue'
import Input from '@/components/Input.vue'
import TableTrans from '@/components/TableTrans.vue'
import SliderCard from '@/components/SliderCard.vue'
import NavMobile from '@/components/NavMobile.vue'
import axios from 'axios'

export default {
    components:{Navbar,CardDash,Input,TableTrans,SliderCard,NavMobile},
    methods:{
        onInput(val){
            const findItem = []
            this.dataTrans.forEach(trans => {
                trans.items.forEach((item,i) => {
                    if(item.nama.toLowerCase().startsWith(val.toLowerCase())){
                        findItem[i] = {
                            tanggal:trans.tanggal,
                            items:[item]
                        }
                    }
                })
            })
            this.trans = findItem
            if (val == '') this.trans = this.dataTrans
            if (findItem.length == 0) this.notFound = true
            else this.notFound = false
        },
        resetDate(){
            console.log('reset')
            const date = this.$refs.date.$refs.input
            date.value = ''
            this.trans = this.dataTrans
        },
        onDate(){
            const date = this.$refs.date.$refs.input.value
            const newDate = date.split('-').reverse().join('/')
            const findTrans = []
            this.dataTrans.forEach(tr => {
                const d = tr.tanggal.split(' ')[0]
                if (d == newDate){
                    tr.items.forEach(tran => findTrans.push(tran))
                }
            })
            this.trans = [{
                tanggal:newDate,
                items:findTrans
            }]
            if (date == '') this.trans = this.dataTrans
            if (findTrans.length == 0) this.notFound = true
            else this.notFound = false
        }
    },
    data(){
        return{
            isLoad:false,
            trans:[],
            dataTrans:[],
            notFound:false,
            cards:[
                {
                    icon:'ant-design:line-chart-outlined',
                    nama:'Untung',
                    val:0
                },
                {
                    icon:'carbon:report',
                    nama:'Terjual',
                    val:0
                },
                {
                    icon:'akar-icons:shipping-box-01',
                    nama:'Barang',
                    val:0
                }
            ]
        }
    },
    created(){
        this.isLoad = true
        const token = JSON.parse(localStorage.getItem("token"));

        // get all laba
        axios.get(`http://localhost:3000/chart/${token}`)
        .then(res => {
            const untung = res.data.untung
            this.cards[0].val = untung
        })

        // get total item
        axios.get(`https://aiycashier.herokuapp.com/items/total/${token}`)
        .then(res => {
            const total = res.data.total
            this.cards[2].val = total
        })

        // get all transaksi
        axios.get(`https://aiycashier.herokuapp.com/transaksi/${token}`)
            .finally(() => this.isLoad = false)
            .then(res => {
                const result = res.data.data
                this.trans = result
                this.dataTrans = result
                let count = 0
                result.forEach(trans => trans.items.forEach((item) => count ++))
                this.cards[1].val = count
                const data = result
                console.log(data)
        })
    }
}
</script>

<style>

</style>