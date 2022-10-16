<template>
  <div class="flex">
    <Navbar />
    <NavMobile />
    <div class="lg:w-full w-screen flex flex-col items-center">
      <!-- content -->
      <h1 class="text-4xl font-bold mt-10">Data Toko</h1>
      <div class="avatar mt-5">
        <div
          class="w-24 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2"
        >
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div class="w-3/4 lg:w-1/3 flex flex-col gap-3 mt-10">
        <Input nama="nama toko" ref="nama" :val="shop.nama" />
        <Input nama="pemilik" ref="admin" :val="shop.admin" />
        <Input nama="alamat" ref="alamat" :val="shop.alamat" />
        <button
          class="btn mt-5 w-full bg-color1 border-color1 hover:bg-color2 hover:border-color2"
          @click="updateShop"
        >
          Simpan
        </button>
        <button class="btn w-full" @click="this.$router.push('dashboard')">
          Kembali
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Input from "@/components/Input.vue";
import NavMobile from "@/components/NavMobile.vue";
import axios from "axios";

export default {
  data() {
    return {
      shop: {},
    };
  },
  components: { Navbar, Input, NavMobile },
  methods: {
    updateShop() {
      const token = JSON.parse(localStorage.getItem("token"));
      const ref = this.$refs;
      const shop = {
        nama: ref.nama.$refs.input.value,
        admin: ref.admin.$refs.input.value,
        alamat: ref.alamat.$refs.input.value,
      };
      axios.put(`https://aiycashier.herokuapp.com/shop/${token}`, shop).then((res) => {
            this.$swal.fire({
                position: "center",
                icon: "success",
                title: "Toko berhasil di ubah",
                showConfirmButton: false,
                timer: 1500,
            }).then(res => this.$router.push('/dashboard'))
      });
    },
  },
  created() {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.get(`https://aiycashier.herokuapp.com/${token}`).then((res) => {
      const data = res.data.data;
      const role = data.role;
      if (role == "kasir" || role == "pengelola") {
        this.$router.push("/dashboard");
      }
    });

    axios.get(`https://aiycashier.herokuapp.com/shop/${token}`).then((res) => {
      const result = res.data.data;
      this.shop = result;
      console.log(this.shop);
    });
  },
};
</script>

<style></style>
