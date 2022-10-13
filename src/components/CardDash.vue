<template>
    <div class="card w-60 bg-color1 shadow-xl rounded-xl ">
        <div class="card-body flex-row items-center gap-5 text-white py-5 px-3">
            <Icon :icon="icon" class="text-6xl"/>
            <div>
                <h2 class="card-title">{{nama}}</h2>
                <p>{{val}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        icon:String,
        nama:String,
        val:String
    }
}
</script>

<style>

</style>