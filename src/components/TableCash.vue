<template>
  <div class="overflow-x-auto h-60">
  <table class="table w-full">
    <!-- head -->
    <thead class="sticky top-0">
      <tr>
        <th></th>
        <th>Nama</th>
        <th>Kategori</th>
        <th>Satuan</th>
        <th>Harga</th>
        <th>Jumlah</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="n in 10" :key="n">
        <td>{{n}}</td>
        <td>Chocolatos</td>
        <td>Minuman</td>
        <td>pcs</td>
        <td>500</td>
        <td>2</td>
        <td>1000</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>