<template>
  <div class="animate-pulse">
    <Icon icon="healthicons:ui-user-profile" class="text-[50px] mx-auto text-slate-300"/>
    <div class="flex flex-col items-center mt-10 gap-10">
      <Icon v-for="n in 3" :key="n" icon="mdi:checkbox-blank" class="text-4xl text-slate-300 rounded-full"/>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
