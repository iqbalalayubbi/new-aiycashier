<template>
    <div>
        <div class="overflow-x-auto absolute z-10 w-[95%] lg:w-3/4 flex justify-center left-3 lg:left-40 top-32 lg:top-20">
            <table class="table w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <th></th>
                        <th>Nama</th>
                        <th>Kategori</th>
                        <th>Satuan</th>
                        <th>Harga</th>
                        <th>Stok</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in items" :key="i" @click="clickItem(item)" class="hover hover:cursor-pointer">
                        <th>{{i+1}}</th>
                        <td>{{item.nama}}</td>
                        <td>{{item.kategori}}</td>
                        <td>{{item.satuan}}</td>
                        <td>{{item.harga}}</td>
                        <td>{{item.stok}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="absolute h-full w-full bg-black opacity-50 z-0" @click="clickBg"></div>
    </div>
</template>

<script>
export default {
    methods:{
        clickBg(){
            this.$emit('clickBg')
        },
        clickItem(item){
            this.$emit('clickItem',item)
        }
    },
    props:{
        items:String
    }
}
</script>

<style>

</style>