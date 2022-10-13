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
      <tr>
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img src="https://placeimg.com/80/80/people" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">coca cola</div>
            </div>
          </div>
        </td>
        <td>minuman</td>
        <td>btl</td>
        <td>5000</td>
        <td>6000</td>
        <td>20</td>
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

}
</script>

<style>

</style>