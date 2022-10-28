<template>
  <div class="flex">
    <Navbar />
    <NavMobile />
    <div class="lg:w-full w-screen flex flex-col items-center">
      <!-- content -->
      <h1 class="text-4xl font-bold xl:mt-3 lg:mt-10 mt-10">Data Toko</h1>

      <div class="indicator">
        <span
          class="indicator-item indicator-bottom sm:indicator-middle md:indicator-bottom lg:indicator-center xl:indicator-end"
        >
          <label class="hover:opacity-50 hover:cursor-pointer">
            <input
              type="file"
              class="hidden"
              @change="onFileChange"
              name="image"
            />
            <Icon
              icon="ant-design:picture-filled"
              class="text-4xl text-slate-500"
            />
          </label>
        </span>
        <div class="grid w-32 h-32 bg-transparent place-items-center">
          <div class="avatar mt-5">
            <div
              class="w-full rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2"
            >
              <img :src="src" alt="item" ref="image" />
            </div>
          </div>
        </div>
      </div>

      <div class="w-3/4 lg:w-1/3 flex flex-col gap-3 mt-10">
        <Input nama="nama toko" ref="nama" :val="shop.nama" />
        <Input nama="pemilik" ref="admin" :val="shop.admin" />
        <Input nama="alamat" ref="alamat" :val="shop.alamat" />
        <button
          class="btn mt-5 xl:mt-3 w-full bg-color1 border-color1 hover:bg-color2 hover:border-color2"
          @click="updateShop"
        >
          Simpan
        </button>
        <button class="btn w-full" @click="this.$router.push('/dashboard')">
          Kembali
        </button>
      </div>

      <div
        v-show="isLoad"
        class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-10"
      ></div>
      <Icon
        v-show="isLoad"
        icon="line-md:loading-loop"
        class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Input from "@/components/Input.vue";
import NavMobile from "@/components/NavMobile.vue";
import axios from "axios";
import path from "../utils/path.js";
import img from '../assets/defaut-shop.svg'

export default {
  data() {
    return {
      shop: {},
      isLoad: false,
      selectedFile: "",
      src:img
    };
  },
  components: { Navbar, Input, NavMobile },
  methods: {
    onFileChange(e) {
      const image = this.$refs.image
      const selectedFile = e.target.files[0]; // accessing file
      const url = URL.createObjectURL(selectedFile)
      image.setAttribute('src',url)
      this.selectedFile = selectedFile;
    },
    updateShop() {
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      const token = JSON.parse(localStorage.getItem("token"));

      const ref = this.$refs;
      const shop = {
        nama: ref.nama.$refs.input.value,
        admin: ref.admin.$refs.input.value,
        alamat: ref.alamat.$refs.input.value,
      };

      this.$swal.fire({
        title: "Simpan Data Toko?",
        showCancelButton: true,
        confirmButtonText: "Simpan",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoad = true
          axios
              .post(`${path}upload/shop/${token}`, formData)
              .then(() => {
                axios.put(`${path}shop/${token}`, shop)
                  .finally(() => this.isLoad = false)
                  .then(() => {
                  this.$swal
                    .fire({
                      position: "center",
                      icon: "success",
                      title: "Toko berhasil di ubah",
                      showConfirmButton: false,
                      timer: 1500,
                    })
                    .then(() => this.$router.push("/dashboard"));
                });
              })
              .catch((err) => {
                console.log(err);
              });
          
        }
      });

    },
  },
  created() {
    const token = JSON.parse(localStorage.getItem("token"));
    this.isLoad = true;
    axios
      .get(`${path}${token}`)
      .finally(() => (this.isLoad = false))
      .then((res) => {
        const data = res.data.data;
        const role = data.role;
        if (role == "kasir" || role == "pengelola") {
          this.$router.push("/dashboard");
        }
      });

    axios.get(`${path}shop/${token}`).then((res) => {
      const result = res.data.data;
      this.shop = result;
      if (result.image !== undefined) this.src = result.image
    });
  },
};
</script>

<style></style>
