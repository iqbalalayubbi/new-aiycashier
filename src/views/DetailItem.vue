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
      <h1 class="text-2xl lg:text-4xl font-bold mt-10">Ubah Barang</h1>

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
              <img :src="[items[0].image == undefined ? src : items[0].image ]" alt="item" ref="image"/>
            </div>
          </div>
        </div>
      </div>
      <!-- akhir profile img -->

      <div
        ref="item"
        v-for="(item, i) in items"
        :key="i"
        class="flex w-[90%] lg:w-3/4 justify-center gap-5"
      >
        <div class="w-1/2 lg:w-1/3 flex flex-col gap-3 mt-10">
          <Input
            nama="nama Barang"
            ref="nama"
            :val="item.nama"
            @onInput="onInput($event, 'nama')"
          />
          <Input
            nama="kategori"
            ref="kategori"
            :val="item.kategori"
            @onInput="onInput($event, 'kategori')"
          />
          <Input
            nama="satuan"
            ref="satuan"
            :val="item.satuan"
            @onInput="onInput($event, 'satuan')"
          />
        </div>
        <div class="w-1/2 lg:w-1/3 flex flex-col gap-3 mt-10">
          <Input
            nama="modal"
            ref="modal"
            :val="item.modal"
            @onInput="onInput($event, 'modal')"
          />
          <Input
            nama="harga"
            ref="harga"
            :val="item.harga"
            @onInput="onInput($event, 'harga')"
          />
          <Input
            nama="stok"
            ref="stok"
            :val="item.stok"
            @onInput="onInput($event, 'stok')"
          />
        </div>
      </div>
      <button
        class="btn mt-5 w-[90%] lg:w-1/3 bg-color1 border-color1 hover:bg-color2 hover:border-color2"
        @click="saveItem"
      >
        Simpan
      </button>
      <button
        class="btn w-[90%] lg:w-1/3 mt-5"
        @click="this.$router.push('/barang')"
      >
        Kembali
      </button>
    </div>

    <!-- loading -->
    <div
      v-show="isLoad"
      class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-10"
    ></div>
    <Icon
      v-show="isLoad"
      icon="line-md:loading-loop"
      class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"
    />
    <!-- <LoadDetailItem v-show="isLoad" class="absolute top-20 left-10"/> -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Input from "@/components/Input.vue";
import LoadDetailItem from "@/components/LoadDetailItem.vue";
import axios from "axios";
import path from "../utils/path.js";
import img from '../assets/defaut-item.svg'

export default {
  data() {
    return {
      items: [],
      isLoad: false,
      item: {},
      selectedFile: "",
      src:img
    };
  },
  methods: {
    onUploadFile() {
      const token = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      const id = this.$route.params.id
      axios
        .post(
          `http://localhost:3000/upload/item/${token}?id=${id}`,
          formData
        )
        .finally(() => {
            axios.put(`${path}items/${id}/${token}`, this.item).then(() => {
                this.$swal
                  .fire({
                    position: "center",
                    icon: "success",
                    title: "item berhasil di ubah",
                    showConfirmButton: false,
                    timer: 500,
                  })
                  .then(() => {
                    this.isLoad = false;
                    this.$router.push("/barang");
                  });
            })
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onFileChange(e) {
      const image = this.$refs.image
      const selectedFile = e.target.files[0]; // accessing file
      const url = URL.createObjectURL(selectedFile)
      image.setAttribute('src',url)
      this.selectedFile = selectedFile;
    },
    saveItem() {
      this.isLoad = true;
      this.onUploadFile();
    },
    onInput(val, input, $event) {
      if (input == "nama") this.item.nama = val;
      if (input == "kategori") this.item.kategori = val;
      if (input == "satuan") this.item.satuan = val;
      if (input == "modal") this.item.modal = val;
      if (input == "harga") this.item.harga = val;
      if (input == "stok") this.item.stok = val;
    },
  },
  components: { Navbar, Input, LoadDetailItem },
  created() {
    this.isLoad = true;
    const id = this.$route.params.id;
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${path}items/${id}/${token}`)
      .finally(() => {
        this.isLoad = false;
      })
      .then((res) => {
        const result = res.data;
        this.items = result;
      });
  }
};
</script>
