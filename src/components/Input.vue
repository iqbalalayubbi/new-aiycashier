<template>
    <div class="flex flex-col">
        <label for="">{{nama}}</label>
        <input :type="type" class="border-2 border-color1 rounded-md h-10 indent-3" :placeholder="placeholder" @input="onInput">
    </div>
</template>

<script>
export default {
    props:{
        nama:String,
        type:String,
        placeholder:String
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