<template>
    <div class="flex flex-col relative">
        <label for="">{{nama}}</label>
        <input :type="type" class="border-2 border-color1 rounded-md h-10 indent-3" :placeholder="placeholder" @input="onInput" ref="input" :value="val" :class="inputClass" @focus="onFocus">
        <!-- <label for="" class="absolute right-0" :class="statusClass">{{statusName}}</label> -->
    </div>
</template>

<script>
export default {
    props:{
        nama:String,
        type:String,
        placeholder:String,
        val:String,
        inputClass:String,
    },
    data(){
        return {
            statusClass:'',
            statusName:'',
        }
    },
    methods:{
        onInput(e){
            this.$emit('onInput',e.target.value)
        },
        onFocus(){
            this.$emit('onFocus')
        }
    }
}
</script>

<style>

</style>