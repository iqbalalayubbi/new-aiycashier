<template>
  <div class="overflow-x-auto w-full overflow-y-auto">
    <table class="table w-full">
      <!-- head -->
      <thead class="sticky top-0 lg:z-10">
        <tr>
          <th>nama</th>
          <th>kategori</th>
          <th>satuan</th>
          <th>modal</th>
          <th>harga</th>
          <th>stok</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="(item, i) in items" :key="i">
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img
                    src="https://placeimg.com/80/80/people"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ item.nama }}</div>
              </div>
            </div>
          </td>
          <td>{{ item.kategori }}</td>
          <td>{{ item.satuan }}</td>
          <td>{{ item.modal }}</td>
          <td>{{ item.harga }}</td>
          <td>{{ item.stok }}</td>
          <th>
            <button class="btn btn-ghost btn-xs" @click="clickDetail(item.id)">
              lihat
            </button>
          </th>
          <th>
            <button
              class="btn btn-error text-white btn-xs"
              @click="deleteItem(item.id)"
            >
              hapus
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    items: String,
  },
  methods: {
    clickDetail(id) {
      this.$router.push(`/items/${id}`);
    },
    deleteItem(id) {
      const token = JSON.parse(localStorage.getItem("token"));
      this.$swal
        .fire({
          title: "Ingin menghapus barang?",
          showCancelButton: true,
          confirmButtonText: "Hapus",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios.delete(`http://localhost:3000/items/${id}/${token}`).then(() => {
              this.$swal.fire({
                position: "center",
                icon: "success",
                title: "Barang berhasil dihapus",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => this.$router.push('/items'))
            });
          }
        });
    },
  },
};
</script>
