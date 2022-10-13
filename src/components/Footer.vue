<template>
<footer class="footer px-10 py-5 bg-neutral text-neutral-content flex justify-between">
  <div>
    <img src="../assets/logo2.svg" class="w-20 lg:w-40" alt="">
    <p>copyright aiycashier</p>
  </div>
  <div>
    <span class="footer-title">Social</span> 
    <div class="grid grid-flow-col gap-4">
      <Icon icon="bi:instagram"  class="text-xl lg:text-4xl"/>
      <Icon icon="entypo-social:twitter"  class="text-xl lg:text-4xl"/>
      <Icon icon="akar-icons:github-fill"  class="text-xl lg:text-4xl"/>
    </div>
  </div>
  <div>
    <span class="footer-title">Menu</span> 
    <a class="link link-hover">Beranda</a>
    <a class="link link-hover">Fitur</a>
    <a class="link link-hover">Tentang</a>
  </div> 
</footer>
</template>

<script>
export default {
    name:'Footer-Comp'
}
</script>

<style>

</style>