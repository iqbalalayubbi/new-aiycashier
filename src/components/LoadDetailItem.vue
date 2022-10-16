<template>
  <div class="lg:w-full w-screen flex flex-col items-center animate-pulse">
            <!-- content -->
            <div class="bg-slate-300 h-10 w-28 rounded-md"></div>
            <div class="avatar mt-5">
                <div class="w-24 bg-slate-300 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                </div>
            </div>
            <div class="flex w-3/4 justify-center gap-5">
                <div class="w-1/3 flex flex-col gap-10 mt-10">
                    <div class="bg-slate-300 h-10 w-80 rounded-xl"></div>
                    <div class="bg-slate-300 h-10 w-80 rounded-xl"></div>
                    <div class="bg-slate-300 h-10 w-80 rounded-xl"></div>
                </div>
                <div class="w-1/3 flex flex-col gap-10 mt-10">
                    <div class="bg-slate-300 h-10 w-80 rounded-xl"></div>
                    <div class="bg-slate-300 h-10 w-80 rounded-xl"></div>
                    <div class="bg-slate-300 h-10 w-80 rounded-xl"></div>
                </div>
            </div>
            <div class="h-10 btn mt-5 w-1/3 bg-color1 border-color1 hover:bg-color2 hover:border-color2"></div>
            <div class="h-10 btn mt-5 w-1/3"></div>
        </div>
</template>

<script>
import Input from '@/components/Input.vue'

export default {
    components:{Input}
}
</script>

<style>

</style>