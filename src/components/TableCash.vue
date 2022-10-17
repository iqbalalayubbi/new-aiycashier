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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i" :data-id="item.id" ref="item" :data-modal="item.modal">
          <td>{{ i + 1 }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.kategori }}</td>
          <td>{{ item.satuan }}</td>
          <td>{{ item.harga }}</td>
          <td>
            <input
              type="text"
              class="w-10"
              @input="chanCount"
              value="1"
              ref="count"
            />
          </td>
          <td ref="total">{{ item.harga }}</td>
          <td @click="cancelItem" :data-id="item.id">
            <Icon icon="ep:circle-close-filled" class="text-red-600 text-2xl"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    items: String,
  },
  methods: {
    chanCount(e) {
      const target = e.target;
      const count = target.value;
      const price = target.parentElement.previousElementSibling.innerHTML;
      const total = target.parentElement.nextElementSibling;
      total.innerHTML = parseInt(count) * parseInt(price);
      this.calculateItem();
    },
    calculateItem() {
      const ref = this.$refs;
      const totalAll = ref.total;
      let finalTotal = 0;
      totalAll.forEach((el) => {
        finalTotal += parseInt(el.innerHTML);
      });
      this.$emit("calItem", finalTotal);
    },
    cancelItem(e) {
      const target = e.target
      let id
      if (target.tagName == 'path'){
        id = target.parentElement.parentElement.getAttribute('data-id')
      }
      if (target.tagName == 'svg'){
        id = target.parentElement.getAttribute('data-id')
      }
      this.$swal
        .fire({
          title: "hapus item?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "hapus",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$emit('removeItem',id)
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "item berhasil dihapus",
              showConfirmButton: false,
              timer: 800,
            });
          }
        });
    },
  },
  updated() {
    this.calculateItem();
  },
};
</script>

<style></style>
