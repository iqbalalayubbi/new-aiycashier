<template>
  <nav
    class="lg:w-16 bg-color1 h-screen hidden lg:flex flex-col gap-5 hover:lg:w-40 transition-all duration-300"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <ProfileMenu class="mt-8 self-center" :isOpen="isOpen" v-show="finish" />
    <div
      v-for="(m, i) in menu"
      :key="i"
      class="flex text-white items-center ml-2 gap-3 hover:bg-white py-3 pl-2 hover:text-color1 hover:rounded-l-md hover:cursor-pointer"
      @click="clickMenu(m.nama)"
      v-show="finish"
      :class="[m.nama.toLowerCase() == isActive ? 'bg-white text-color1' : '']"
    >
      <Icon :icon="m.icon" class="text-2xl" />
      <span v-show="isOpen">{{ m.nama }}</span>
    </div>

      <!-- :class="[m.nama.toLowerCase() == this.$router.pa]" -->
    <!-- logout button -->
    <div
      class="flex text-white bg-red-600 items-center ml-2 gap-3 hover:bg-red-700 py-3 pl-2 hover:text-white hover:rounded-l-md hover:cursor-pointer"
      @click="clickMenu('keluar')"
      v-show="finish"
    >
      <Icon
        icon="majesticons:logout-line"
        class="text-2xl rotate-180 font-bold"
      />
      <span v-show="isOpen" class="font-bold">Keluar</span>
    </div>
    <!-- loading skeleton -->
    <LoadNav v-show="isLoad" class="absolute lg:w-16 top-10" />
  </nav>
</template>

<script>
import ProfileMenu from "@/components/ProfileMenu.vue";
import LoadNav from "@/components/LoadNav.vue";
import axios from "axios";
import path from '../utils/path.js'

export default {
  data() {
    return {
      isOpen: false,
      isLoad: false,
      finish: false,
      isActive:'',
      dataMenu: [
        {
          icon: "ant-design:home-filled",
          nama: "Dashboard",
        },
        {
          icon: "fa-solid:cash-register",
          nama: "Kasir",
        },
        {
          icon: "clarity:employee-group-solid",
          nama: "Karyawan",
        },
        {
          icon: "akar-icons:shipping-box-01",
          nama: "Barang",
        },
        {
          icon: "ant-design:bar-chart-outlined",
          nama: "Statistik",
        },
        {
          icon: "entypo:shop",
          nama: "Toko",
        },
        {
          icon: "carbon:password",
          nama: "Password",
        },
      ],
      menu: [],
    };
  },
  methods: {
    clickMenu(menu) {
      const nav = menu.toLowerCase();
      if (nav == "dashboard")this.$router.push("/dashboard")
      if (nav == "kasir") this.$router.push("/kasir");
      if (nav == "karyawan") this.$router.push("/karyawan");
      if (nav == "barang") this.$router.push("/barang");
      if (nav == "statistik") this.$router.push("/statistik");
      if (nav == "toko") this.$router.push("/toko");
      if (nav == "password") this.$router.push("/password");
      if (nav == "keluar") {
        this.$swal.fire({
          title: "Yakin ingin keluar?",
          text: "kamu akan keluar dari aplikasi!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Keluar",
          cancelButtonText: "Batal",
        }).then((result) => {
          if (result.isConfirmed) {
              localStorage.removeItem('token')
              this.$router.push("/login");
          }
        });
      }
    },
  },
  components: { ProfileMenu, LoadNav },
  created() {
    const currPath = window.location.pathname.split('/')[1]
    this.isActive = currPath

    const token = JSON.parse(localStorage.getItem("token"));
    this.isLoad = true;

    axios
      .get(`${path}${token}`)
      .finally(() => {
        this.isLoad = false;
        this.finish = true;
      })
      .then((res) => {
        const data = res.data.data;
        const role = data.role;
        console.log(role);
        if (role == "admin") {
          this.menu = this.dataMenu
        }
        else{
          if (role == "kasir") {
            this.menu[0] = this.dataMenu[0];
            this.menu[1] = this.dataMenu[1];
          }
          if (role == "pengelola") {
            console.log("benar");
            this.menu[0] = this.dataMenu[0];
            this.menu[1] = this.dataMenu[1];
            this.menu[2] = this.dataMenu[3];
            this.menu[3] = this.dataMenu[4];
          }
        }
      });
  },
};
</script>

<style></style>
