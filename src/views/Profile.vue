<template>
  <div class="flex">
    <Navbar />
    <div class="dropdown dropdown-right absolute top-0 left-0 lg:hidden block">
      <label
        tabindex="0"
        class="btn m-1 p-0 w-12 bg-transparent border-color1 hover:bg-transparent hover:border-color1"
      >
        <Icon icon="charm:menu-hamburger" class="text-2xl text-color1" />
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border-base-300"
      >
        <ProfileMenu class="mt-12 self-center" :isOpen="false" />
        <li><a>Dashboard</a></li>
        <li><a>Kasir</a></li>
        <li><a>Karyawan</a></li>
        <li><a>Barang</a></li>
        <li><a>Statistik</a></li>
      </ul>
    </div>
    <div class="lg:w-full w-screen flex flex-col items-center">
      <!-- content -->
      <h1 class="text-4xl font-bold mt-10">Profil</h1>

      <!-- profile img -->
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
      <!-- akhir profile img -->

      <div class="flex w-[90%] lg:w-3/4 justify-center gap-5 lg:mt-0 mt-10">
        <div class="w-1/2 lg:w-1/3 flex flex-col gap-3 mt-10">
          <Input nama="Nama" ref="nama" :val="user.nama" @onInput="onInput" />
          <Input
            nama="Username"
            ref="username"
            :val="user.username"
            inputClass="bg-slate-300 border-none"
          />
        </div>
        <div class="w-1/2 lg:w-1/3 flex flex-col gap-3 mt-10">
          <Input nama="No Hp" ref="no_hp" :val="user.no_hp" />
          <Input
            nama="Role"
            ref="role"
            :val="user.role"
            inputClass="bg-slate-300 border-none"
            @onInput="onInput"
          />
        </div>
      </div>
      <button
        class="btn mt-5 w-[80%] lg:w-1/3 bg-color1 border-color1 hover:bg-color2 hover:border-color2"
        @click="clickBtn('simpan')"
        ref="simpan"
      >
        Simpan
      </button>
      <button class="btn w-[80%] lg:w-1/3 mt-5" @click="this.$router.go(-1)">
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
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Input from "@/components/Input.vue";
import axios from "axios";
import path from "../utils/path.js";
import img from "../assets/default.svg";

export default {
  data() {
    return {
      user: [],
      selectedFile: "",
      isLoad: false,
      src: img,
      userValid: false,
      imgValid: false,
    };
  },
  components: { Navbar, Input },
  methods: {
    onInput() {
      const ref = this.$refs;
      const nama = ref.nama.$refs.input.value;
      const no_hp = ref.no_hp.$refs.input.value;
      if (nama.length !== 0 && no_hp.length !== 0) this.userValid = true;
      if (this.userValid) this.$refs.simpan.disabled = false;
    },
    onFileChange(e) {
      const image = this.$refs.image;
      const selectedFile = e.target.files[0]; // accessing file
      const url = URL.createObjectURL(selectedFile);
      image.setAttribute("src", url);
      this.selectedFile = selectedFile;
      this.$refs.simpan.disabled = false;
      if (this.selectedFile !== "") this.imgValid = true;
    },
    uploadImg() {
      const token = JSON.parse(localStorage.getItem("token"));
      this.isLoad = true;
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      axios
        .post(`${path}upload/user/${token}`, formData)
        .finally(() => {
          this.isLoad = false
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadUser() {
      const ref = this.$refs
      const token = JSON.parse(localStorage.getItem("token"));
      const nama = ref.nama.$refs.input.value;
      const no_hp = ref.no_hp.$refs.input.value;
      const user = { nama, no_hp };

      this.isLoad = true;
      axios.put(`${path}user/${token}`, user).then(() => {
        this.$swal
          .fire({
            position: "center",
            icon: "success",
            title: "profile berhasil di ubah",
            showConfirmButton: false,
            timer: 500,
          })
          .finally(() => (this.isLoad = false))
          .then(() => {
            this.isLoad = false;
            this.$router.push("/dashboard");
          });
      });
    },
    uploadAll() {
      const token = JSON.parse(localStorage.getItem("token"));
      this.isLoad = true;
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      axios
        .post(`${path}upload/user/${token}`, formData)
        .then(() => this.uploadUser())
        .catch((err) => {
          console.log(err);
        });
    },
    clickBtn(act) {
      if (this.userValid || this.imgValid) {
        this.$swal
          .fire({
            title: "Simpan perubahan?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Batal",
            confirmButtonText: "Simpan",
          })
          .then((result) => {
            if (result.isConfirmed) {
              if (this.imgValid && this.userValid) this.uploadAll()
              if (this.imgValid) this.uploadImg();
              else if (this.userValid) this.uploadUser();
            }
          });
      }

      // if (act == "simpan") {
      //   this.isLoad = true;
      //   formData.append("image", this.selectedFile);
      //   axios
      //     .post(`${path}upload/user/${token}`, formData)
      //     .then((res) => {})
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
    },
  },
  created() {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.get(`${path}user/${token}`).then((res) => {
      const result = res.data[0];
      this.user = result;
      if (result.image !== undefined) this.src = result.image;
    });
  },
  mounted() {
    this.$refs.role.$refs.input.disabled = true;
    this.$refs.username.$refs.input.disabled = true;
    this.$refs.simpan.disabled = true;
  },
};
</script>

<style></style>
