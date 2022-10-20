<template>
  <div class="flex">
    <Navbar />
    <NavMobile />
    <div class="lg:w-full w-screen flex flex-col items-center">
      <!-- content -->
      <div class="form-control mt-20 lg:mt-10 w-3/4 lg:w-1/2 relative">
        <div class="input-group w-full">
          <input
            ref="input"
            type="text"
            placeholder="Cari Barang…  (Ctrl + i)"
            class="input input-bordered w-full"
            @input="onInput"
          />
          <button
            class="btn btn-square bg-color1 border-color1 hover:bg-color2 hover:border-color2"
          >
            <Icon icon="akar-icons:search" class="text-xl" />
          </button>
        </div>
        <ul
          class="menu bg-base-100 p-2 rounded-box border-2 border-base-300 w-full absolute top-12 z-[99]"
          v-show="isInput"
        >
          <li v-for="(item, i) in items" :key="i">
            <a :class="[i == 0 ? 'bg-base-300' : '']">{{ item }}</a>
          </li>
        </ul>
      </div>

      <TableItems
        class="w-[90%] lg:w-3/4 mt-10 h-96"
        :items="items"
        @deleteItem="deleteItem"
      />
      <span v-show="notFound" class="text-xl -mt-80"
        >transaksi tidak ditemukan
      </span>
      <TableLoad
        v-show="isLoad"
        class="absolute w-[90%] lg:w-3/4 z-[99] top-40 lg:top-32"
      />
      <button
        class="btn mt-10 w-1/2 bg-color1 border-color1 hover:bg-color2 hover:border-color2"
        @click="this.$router.push('barang/tambah')"
      >
        Tambah Barang
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import TableItems from "@/components/TableItems.vue";
import NavMobile from "@/components/NavMobile.vue";
import TableLoad from "@/components/TableLoad.vue";
import axios from "axios";
import path from '../utils/path.js'

export default {
  data() {
    return {
      isInput: false,
      items: [],
      data: [],
      isLoad: true,
      notFound: false,
    };
  },
  components: { Navbar, TableItems, NavMobile, TableLoad },
  methods: {
    deleteItem(id) {
      const token = JSON.parse(localStorage.getItem("token"));
      this.$swal
        .fire({
          title: "Ingin menghapus barang?",
          showCancelButton: true,
          confirmButtonText: "Hapus",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.isLoad = true;
            axios
              .delete(`${path}items/${id}/${token}`)
              .then(() => {
                this.$swal
                  .fire({
                    position: "center",
                    icon: "success",
                    title: "Barang berhasil dihapus",
                    showConfirmButton: false,
                    timer: 1500,
                  })
                  .finally(() => (this.isLoad = false))
                  .then(() => {
                    axios
                      .get(`${path}items/${token}`)
                      .then((res) => {
                        const items = res.data.data;
                        this.items = items;
                        this.data = items;
                      });
                  });
              });
          }
        });
    },
    onInput(e) {
      const val = e.target.value.toLowerCase();
      const found = [];
      this.data.forEach((item) => {
        if (item.nama.toLowerCase().startsWith(val)) {
          found.push(item);
        }
      });
      this.items = found;
      found.length == 0 ? (this.notFound = true) : (this.notFound = false);
    },
    onKeyboard(e) {
      const key = e.key;
      if (e.ctrlKey && key == "i") this.$refs.input.focus();
    },
  },
  created() {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${path}${token}`)
      .finally(() => (this.isLoad = false))
      .then((res) => {
        const data = res.data.data;
        const role = data.role;
        if (role == "kasir") {
          this.$router.push("/dashboard");
        }
      });

    axios.get(`${path}items/${token}`).then((res) => {
      const items = res.data.data;
      this.items = items;
      this.data = items;
    });
  },
  mounted() {
    this.$refs.input.focus();
    document.addEventListener("keydown", this.onKeyboard);
  },
};
</script>

<style></style>
