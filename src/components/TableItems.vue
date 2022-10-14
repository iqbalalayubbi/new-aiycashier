<template>
  <div class="overflow-x-auto w-full">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>nama</th>
        <th>kategori</th>
        <th>satuan</th>
        <th>modal</th>
        <th>harga</th>
        <th>stok</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(item,i) in items" :key="i">
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img src="https://placeimg.com/80/80/people" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">{{item.nama}}</div>
            </div>
          </div>
        </td>
        <td>{{item.kategori}}</td>
        <td>{{item.satuan}}</td>
        <td>{{item.modal}}</td>
        <td>{{item.harga}}</td>
        <td>{{item.stok}}</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>    
  </table>
</div>
</template>

<script>
export default {
  props:{
    items:String
  }
}
</script>

<style>

</style>