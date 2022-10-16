<template>
  <div class="overflow-x-auto overflow-y-auto h-80">
  <table class="table w-full table-zebra">
    <!-- head -->
    <thead class="sticky top-0">
      <tr>
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
      <!-- <template v-for="n in totalTrans"> -->
        <template v-for="(trans,i) in transaksi" :key="i">
          <tr v-for="(item,x) in trans.items" :key="x">
            <td>{{trans.tanggal}}</td>
            <td>{{item.nama}}</td>
            <td>{{item.kategori}}</td>
            <td>{{item.satuan}}</td>
            <td>{{item.harga}}</td>
            <td>{{item.jumlah}}</td>
            <td>{{item.total}}</td>
          </tr>
        </template>
      <!-- </template> -->
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props:{
    transaksi:Object,
    totalTrans:Number
  }
}
</script>

<style>

</style>

<!-- 
  [
    {
      tanggal : {tanggal},
      items:[
        {item1},
        {item2}
      ]
    } 
  ]
 -->