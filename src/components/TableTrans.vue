<template>
  <div class="overflow-x-auto overflow-y-auto h-80">
  <table class="table w-full table-zebra">
    <!-- head -->
    <thead class="sticky top-0">
      <tr>
        <th>No</th>
        <th>Tanggal</th>
        <th>Nama</th>
        <th>Kategori</th>
        <th>Satuan</th>
        <th>Harga</th>
        <th>Jumlah</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="n in 10" :key="n">
        <td>{{n}}</td>
        <td>12/02/22 18:00</td>
        <td>Chocolatos</td>
        <td>Makanan</td>
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