<template>
  <div class="flex">
    <Navbar />
    <NavMobile class="z-10"/>
    <div class="lg:w-full w-screen relative">
      <!-- content -->
      <div class="flex items-center mt-10 flex-col">
      <!-- display total -->
        <div
          class="border-color1 lg:mt-0 mt-10 border-2 lg:w-1/2 w-[70%] h-24 lg:h-28 rounded-xl flex justify-end items-center px-5"
        >
          <h1 class="text-xl lg:text-4xl text-color1">Rp{{ total }}</h1>
        </div>

        <div class="form-control mt-10 lg:w-1/2 w-3/4">
          <div class="input-group w-full">
            <input
              type="text"
              placeholder="Cari Barang…   (Ctrl + i)"
              class="input input-bordered w-full" ref="input" @input="onInput"
            />
            <button
              class="btn btn-square bg-color1 border-color1 hover:bg-color2 hover:border-color2"
              @click="chooseItem = true"
            >
              <Icon icon="akar-icons:search" class="text-xl" />
            </button>
          </div>
        </div>

        <TableCash
          ref="table"
          :items="dataTableItems"
          class="mt-5 w-3/4"
          @calItem="calItem"
          @removeItem="removeItem"
        />

        <button
          class="btn mt-10 w-3/4 lg:w-1/2 bg-color1 border-color1 hover:bg-color2 hover:border-color2"
          @click="clickPay"
        >
          Bayar
        </button>
      </div>

      <!-- choose payment -->
      <ChoosePay
        v-show="isChoosePay"
        class="absolute top-10 lg:top-10 w-full"
        @choosePay="choosePay"
        :class="[isPopup ? 'z-10' : 'z-0']"
        @cancelPay="cancelPay"
      />

      <!-- payment -->
      <Pay
        v-show="isPay"
        class="absolute top-20 w-full z-10"
        @paySuccess="paySuccess"
        :typePay="typePay"
        :namePay="namePay"
        :total="total"
        @cancelPay="cancelPay"
      />
    </div>

    <!-- popup blank screen -->
    <div
      v-show="isPopup"
      class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50"
      @click="cancelPay"
      :class="[isPopup ? 'z-9' : 'z-0']"
    ></div>

    <!-- popup items -->
    <PopupItems
      :items="items"
      v-show="chooseItem"
      class="absolute w-full h-screen overflow-hidden"
      @clickBg="closeItems"
      @clickItem="clickItem"
    />

    <div v-show="isLoad" class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-10"></div>
    <Icon v-show="isLoad" icon="line-md:loading-loop" class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Input from "@/components/Input.vue";
import TableCash from "@/components/TableCash.vue";
import NavMobile from "@/components/NavMobile.vue";
import PopupItems from "@/components/PopupItems.vue";
import ChoosePay from "@/components/ChoosePay.vue";
import Pay from "@/components/Pay.vue";
import axios from "axios";

// bank
import bri from "../assets/bank/bri.svg";
import mandiri from "../assets/bank/mandiri.svg";
import bca from "../assets/bank/bca.svg";
import bni from "../assets/bank/bni.svg";
import gopay from "../assets/bank/gopay.svg";

export default {
  data() {
    return {
      total: 0,
      chooseItem: false,
      items: [],
      dataItems: [],
      dataTableItems: [],
      itemsId: [],
      isPay: false,
      isChoosePay: false,
      isPopup: false,
      typePay: "",
      namePay: "",
      itemTrans:[],
      isLoad:false,
      inputVal :''
    };
  },
  methods: {
    closeItems(){
      this.chooseItem = false
      this.$refs.input.focus()
    },
    onTyping(e){
      const key = e.key 
      if (e.ctrlKey && key == 'i')this.$refs.input.focus()
      if (key == 'Enter'){
        this.chooseItem = true
      }else if (key == 'Escape'){
        this.chooseItem = false
      }
    },
    onInput(e){
      const val = e.target.value.toLowerCase()
      this.inputVal = val
      const itemFound = []
      this.dataItems.forEach(item => {
        if(item.nama.toLowerCase().startsWith(val)){
          itemFound.push(item)
        }
      })
      this.items = itemFound
    },
    clickItem(item) {
      if (this.itemsId.includes(item.id)) {
        const items = this.$refs.table.$refs.item;
        const id = item.id;
        items.forEach((el) => {
          if (el.getAttribute("data-id") == id) {
            const child = el.children;
            const total = child[6];
            const count = child[5].children[0];
            const prize = child[4];
            count.value++;
            const jumlah = parseInt(count.value) * parseInt(prize.innerHTML);
            total.innerHTML = jumlah;
          }
        });
      } else {
        this.dataTableItems.push(item);
        this.itemsId.push(item.id);
      }
      this.$refs.input.value = ''
      this.$refs.input.focus()
      this.chooseItem = false;
    },
    calItem(total) {
      this.total = total;
    },
    removeItem(id) {
      this.dataTableItems.forEach((item, i) => {
        if (item.id == id) {
          this.dataTableItems.splice(i, 1);
          this.itemsId.splice(i, 1);
        }
      });
    },
    choosePay(type) {
      if (type == "bca") this.typePay = bca;
      if (type == "bri") this.typePay = bri;
      if (type == "mandiri") this.typePay = mandiri;
      if (type == "bni") this.typePay = bni;
      if (type == "gopay") this.typePay = gopay;
      this.namePay = type.toUpperCase();
      this.isPopup = true;
      this.isChoosePay = false;
      this.isPay = true;
    },
    clickPay() {
      this.isPopup = true;
      this.isChoosePay = true;
      this.isPay = false;
    },
    paySuccess() {
      const items = this.$refs.table.$refs.item
      this.isLoad = true
      items.forEach(item => {
        const modal = item.getAttribute('data-modal')
        const child = item.children
        const nama = child[1].innerHTML
        const kategori = child[2].innerHTML
        const satuan = child[3].innerHTML
        const harga = child[4].innerHTML
        const jumlah = child[5].children[0].value
        const total = child[6].innerHTML
        const itemTable = {
          nama,kategori,satuan,modal,harga,jumlah,total
        }
        this.itemTrans.push(itemTable)
      })
      const token = JSON.parse(localStorage.getItem("token"));
      this.isPopup = false;
      this.isChoosePay = false;
      this.isPay = false;
      // make new transaksi
      axios
        .post(`https://aiycashier.herokuapp.com/transaksi/${token}`, this.itemTrans)
        .then((res) => {
            this.$swal
              .fire({
                position: "center",
                icon: "success",
                title: "Pembayran Berhasil",
                showConfirmButton: false,
                timer: 1500,
              })
              .then(() => {
                  this.isLoad = false
                  this.dataTableItems = [];
                  this.itemsId = [];
                
              });
        });
    },
    cancelPay() {
      this.isPopup = false;
      this.isChoosePay = false;
      this.isPay = false;
    },
  },
  components: {
    Navbar,
    Input,
    TableCash,
    NavMobile,
    PopupItems,
    ChoosePay,
    Pay,
  },
  mounted(){
    const input = this.$refs.input
    input.focus()
  },
  created() {
    this.isLoad = true
    const token = JSON.parse(localStorage.getItem("token"));
    // get all items
    axios.get(`https://aiycashier.herokuapp.com/items/${token}`)
    .finally(() => this.isLoad = false)
    .then((res) => {
      const items = res.data.data;
      this.items = items;
      this.dataItems = items;
    });
    window.addEventListener('keydown',this.onTyping)
  },
  updated() {
    const ref = this.$refs;
    if (ref.table.$refs.total !== undefined) {
      const totalAll = ref.table.$refs.total;
      let finalTotal = 0;
      totalAll.forEach((el) => {
        finalTotal += parseInt(el.innerHTML);
      });
      this.total = finalTotal;
    }
  },
};
</script>

<style></style>
