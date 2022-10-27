<template>
    <div class="flex">
        <Navbar/>
        <NavMobile/>
        <div class="lg:w-full w-screen flex justify-center mt-20">
            <!-- content -->
            <div class="lg:w-[60%] w-full flex flex-col">
                <button class="btn w-40 self-center mb-10" @click="changeChart">{{btnName}}</button>
                <canvas id="myChart" class="w-full"></canvas>
            </div>
        </div>
    </div>
    
</template>

<script>
import Chart from 'chart.js/auto'
import Navbar from '@/components/Navbar.vue'
import NavMobile from '@/components/NavMobile.vue'
import axios from 'axios'
import path from '../utils/path'
import tempChart from '../utils/temChart.js'

export default {
    data(){
        return{
            tanggal:[],
            untung:[],
            chartType:'line',
            nama:[],
            totalItem:[],
            btnName:'lihat barang terlaris'
        }
    },
    components:{Navbar,NavMobile},
    methods:{
        changeChart(){
            console.log('click')
            Chart.getChart('myChart').destroy();
            if (this.chartType == 'line'){
                this.btnName = 'lihat keuntungan'
                this.chartType = 'bar'
                const ctx = document.getElementById('myChart').getContext('2d');
                const myChart = new Chart(ctx,tempChart('bar','barang terlaris',this.nama,this.totalItem))
                myChart
            }else if(this.chartType == 'bar'){
                this.btnName = 'lihat barang terlaris'
                this.chartType = 'line'
                const ctx = document.getElementById('myChart').getContext('2d');
                const myChart = new Chart(ctx,tempChart('line','keuntungan',this.tanggal,this.untung))
                myChart
            }
        }
    },
    mounted(){
        const token = JSON.parse(localStorage.getItem('token'))

        axios.get(`${path}chart/profit/${token}`).then(res => {
            const data = res.data
            console.log(data)
            data.forEach(d => {
                this.tanggal.push(d.tanggal)
                this.untung.push(d.untung)
            });

            axios.get(`${path}chart/item/${token}`).then(res => {
                const data = res.data
                data.forEach(d => {
                    this.nama.push(d.nama)
                    this.totalItem.push(d.all)
                })

                const ctx = document.getElementById('myChart').getContext('2d');
                const myChart = new Chart(ctx,tempChart(this.chartType,'keuntungan',this.tanggal,this.untung))
                myChart
            })



        })

    },
    created(){
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get(`${path}${token}`).then(res => {
            const data = res.data.data
            const role = data.role
            if (role == 'kasir') {
                this.$router.push('/dashboard')
            }
        })
    }
}
</script>

<style>

</style>