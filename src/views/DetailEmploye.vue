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
      <h1 class="text-xl lg:text-4xl font-bold mt-10">Profile Karyawan</h1>
      <div class="avatar mt-10">
        <div
          class="w-24 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2"
        >
          <img :src="[employe[0].image == undefined ? src : employe[0].image ]" />
        </div>
      </div>
      <div class="flex w-[90%] lg:w-3/4 justify-center gap-5 mt-5">
        <div class="w-1/2 lg:w-1/3 flex flex-col gap-3 mt-10">
          <Input
            nama="nama"
            ref="nama"
            inputClass="bg-base-300 border-slate-300"
            :val="employe[0].nama"
          />
          <Input
            nama="username"
            ref="username"
            inputClass="bg-base-300 border-slate-300"
            :val="employe[0].username"
          />
        </div>
        <div class="w-1/2 lg:w-1/3 flex flex-col gap-3 mt-10">
          <Input
            nama="no hp"
            ref="noHp"
            inputClass="bg-base-300 border-slate-300"
            :val="employe[0].no_hp"
          />
          <Input
            nama="role"
            ref="role"
            inputClass="bg-base-300 border-slate-300"
            :val="employe[0].role"
          />
        </div>
      </div>
      <button class="btn w-3/4 lg:w-1/3 mt-20" @click="this.$router.push('/karyawan')">
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
import path from '../utils/path.js'
import img from '../assets/default.svg'

export default {
  data() {
    return {
      isLoad: false,
      employe: [],
      src:img
    };
  },
  components: { Navbar, Input },
  mounted() {
    const ref = this.$refs;
    const nama = ref.nama.$refs.input;
    const username = ref.username.$refs.input;
    const noHp = ref.noHp.$refs.input;
    const role = ref.role.$refs.input;
    nama.setAttribute("disabled", true);
    username.setAttribute("disabled", true);
    noHp.setAttribute("disabled", true);
    role.setAttribute("disabled", true);
  },
  created() {
    const token = JSON.parse(localStorage.getItem("token"));
    const id = this.$route.params.id;
    axios
      .get(`${path}employe/${id}/${token}`)
      .then((res) => {
        const result = res.data;
        this.employe = result.data;
      });
  },
};
</script>

<style></style>
