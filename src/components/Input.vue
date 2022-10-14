<template>
    <div class="flex flex-col relative">
        <label for="">{{nama}}</label>
        <input :type="type" class="border-2 border-color1 rounded-md h-10 indent-3" :placeholder="placeholder" @input="onInput" ref="input">
        <label for="" class="absolute right-0" :class="status">{{statusName}}</label>
    </div>
</template>

<script>
export default {
    props:{
        nama:String,
        type:String,
        placeholder:String,
        status:String,
        statusName:String,
        val:String
    },
    methods:{
        onInput(e){
            this.$emit('onInput',e.target.value)
        }
    }
}
</script>

<style>

</style>