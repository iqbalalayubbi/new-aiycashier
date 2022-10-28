<template>
  <div class="overflow-x-auto overflow-y-auto h-80">
  <table class="table w-full table-zebra">
    <!-- head -->
    <thead class="sticky top-0">
      <tr>
        <th class="relative">Tanggal</th>
        <th>Nama</th>
        <th>Kategori</th>
        <th>Satuan</th>
        <th>Harga</th>
        <th>Jumlah</th>
        <th>Total</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <!-- <template v-for="n in totalTrans"> -->
          <tr v-for="(item, i) in items" :key="i">
            <td>{{ item.tanggal }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.kategori }}</td>
            <td>{{ item.satuan }}</td>
            <td>{{ item.harga }}</td>
            <td>{{ item.jumlah }}</td>
            <td>{{ item.total }}</td>
            <td><div class="badge" :class="role(item.role)">{{ item.username }}</div></td>
          </tr>
      <!-- </template> -->
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props:{
    items:String
  },
  methods:{
    role(role){
      if (role == 'admin') return 'badge-primary'
      if (role == 'pengelola') return 'badge-secondary'
      if (role == 'kasir') return 'badge-accent'
    }
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