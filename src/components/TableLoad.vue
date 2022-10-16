<template>
  <div class="overflow-x-auto animate-pulse">
    <div class="flex w-full justify-around bg-slate-200 border-2 border-slate-300 p-3 rounded-md">
        <div v-for="n in 7" :key="n" class="bg-slate-300 w-20 h-5 rounded-xl"></div>
    </div>
    <div class="bg-slate-100 flex flex-col items-center gap-10 pt-10 pb-16">
        <div v-for="n in 3" :key="n" class="flex items-center gap-12">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-slate-300 rounded-md"></div>
                <div class="w-20 h-5 bg-slate-300 rounded-md"></div>
            </div>
            <div v-for="n in 6" :key="n" class="bg-slate-300 w-20 h-5 rounded-xl"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>