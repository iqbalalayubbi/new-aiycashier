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
      <h1 class="text-4xl font-bold mt-10">Tambah Barang</h1>

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
              <img src="../assets/defaut-item.svg" alt="item" ref="image" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-[90%] lg:w-3/4 justify-center gap-5">
        <div class="w-1/2 lg:w-1/3 flex flex-col gap-3 mt-10">
          <Input
            nama="nama Barang"
            ref="nama"
            @onFocus="onFocus('nama')"
            @onInput="onInput"
          />
          <Input
            nama="kategori"
            ref="kategori"
            @onFocus="onFocus('kategori')"
            @onInput="onInput"
          />
          <Input
            nama="satuan"
            ref="satuan"
            @onFocus="onFocus('satuan')"
            @onInput="onInput"
          />
        </div>
        <div class="w-1/2 lg:w-1/3 flex flex-col gap-3 mt-10">
          <Input
            nama="modal"
            ref="modal"
            @onFocus="onFocus('modal')"
            @onInput="onInput"
          />
          <Input
            nama="harga"
            ref="harga"
            @onFocus="onFocus('harga')"
            @onInput="onInput"
          />
          <Input
            nama="stok"
            ref="stok"
            @onFocus="onFocus('stok')"
            @onInput="onInput"
          />
        </div>
      </div>
      <button
        ref="btnSimpan"
        class="btn mt-5 w-[90%] lg:w-1/3 bg-color1 border-color1 hover:bg-color2 hover:border-color2"
        @click="clickBtn('simpan')"
      >
        Tambah
      </button>
      <button
        class="btn w-[90%] lg:w-1/3 mt-5"
        @click="this.$router.push('/barang')"
      >
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

export default {
  data() {
    return {
      isLoad: false,
      inFocus: "nama",
      inValid: false,
      selectedFile: "",
    };
  },
  components: { Navbar, Input },
  methods: {
    onFileChange(e) {
      const image = this.$refs.image;
      const selectedFile = e.target.files[0];
      const url = URL.createObjectURL(selectedFile);
      image.setAttribute("src", url);
      this.selectedFile = selectedFile;
    },
    onInput() {
      this.checkInput();
    },
    checkInput() {
      const ref = this.$refs;
      const namaLeng = ref.nama.$refs.input.value.length;
      const kategoriLeng = ref.kategori.$refs.input.value.length;
      const satuanLeng = ref.satuan.$refs.input.value.length;
      const modalLeng = ref.modal.$refs.input.value.length;
      const hargaLeng = ref.harga.$refs.input.value.length;
      const stokLeng = ref.stok.$refs.input.value.length;
      this.$refs.btnSimpan.setAttribute("disabled", false);
      if (
        namaLeng !== 0 &&
        kategoriLeng !== 0 &&
        satuanLeng !== 0 &&
        modalLeng !== 0 &&
        hargaLeng !== 0 &&
        stokLeng !== 0
      ) {
        this.inValid = true;
        this.$refs.btnSimpan.disabled = false;
      }
    },
    onFocus(el) {
      this.inFocus = el;
      this.checkInput();
    },
    onKeyboard(e) {
      const key = e.key;
      const ref = this.$refs;
      if (key == "Enter") {
        if (this.inFocus == "nama") {
          this.inFocus = "kategori";
          ref.kategori.$refs.input.focus();
        } else if (this.inFocus == "kategori") {
          this.inFocus = "satuan";
          ref.satuan.$refs.input.focus();
        } else if (this.inFocus == "satuan") {
          this.inFocus = "modal";
          ref.modal.$refs.input.focus();
        } else if (this.inFocus == "modal") {
          this.inFocus = "harga";
          ref.harga.$refs.input.focus();
        } else if (this.inFocus == "harga") {
          this.inFocus = "stok";
          ref.stok.$refs.input.focus();
        } else if (this.inFocus == "stok" && this.inValid) {
          this.inFocus = "nama";
          ref.nama.$refs.input.focus();
          this.addItem();
        }
      }
    },
    clickBtn(btn) {
      if (btn == "simpan") {

        this.$swal
          .fire({
            title: "Ingin Menambahkan Barang?",
            showCancelButton: true,
            confirmButtonText: "Tambah",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.addItem();
            }
          });

      }
    },
    addItem() {
      const ref = this.$refs;
      const token = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      this.isLoad = true;

      // data item
      const nama = ref.nama.$refs.input.value;
      const kategori = ref.kategori.$refs.input.value;
      const satuan = ref.satuan.$refs.input.value;
      const modal = ref.modal.$refs.input.value;
      const harga = ref.harga.$refs.input.value;
      const stok = ref.stok.$refs.input.value;

      axios
        .post(`${path}items/${token}`, {
          nama,
          kategori,
          satuan,
          modal,
          harga,
          stok,
        })
        .then((res) => {
          const id = res.data.id;
          axios
            .post(`${path}upload/item/${token}?id=${id}`, formData)
            .then(() => {
              this.$swal
                .fire({
                  position: "center",
                  icon: "success",
                  title: "Berhasil",
                  text: "item berhasil ditambahkan",
                  showConfirmButton: false,
                  timer: 500,
                })
                .finally(() => (this.isLoad = false))
                .then(() => {
                  this.$router.push("/barang");
                });
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },
  },
  created() {
    document.addEventListener("keydown", this.onKeyboard);
  },
  mounted() {
    this.$refs.nama.$refs.input.focus();
    this.$refs.btnSimpan.disabled = true;
  },
};
</script>

<style></style>
