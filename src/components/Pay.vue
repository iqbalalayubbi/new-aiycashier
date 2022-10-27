<template>
  <div>
    <div class="flex flex-col items-center">
      <ul
        class="menu bg-base-100 w-[90%] lg:w-1/2 p-2 rounded-md flex flex-col items-center"
      >
        <li>
          <a>
            <Icon v-show="isCash" icon="fa-solid:money-bill-wave-alt" class="text-4xl text-green-600"/>
            <img v-show="isBank" :src="typePay" alt="" />
            <span ref="namePay">{{ namePay }}</span>
          </a>
        </li>
        <span class="text-center text-xl mt-5">Total : </span>
        <span class="text-center font-bold text-2xl">Rp{{ total }}</span>
        <div v-show="isCash" class="mt-5">
          <Input placeholder="nominal" @onInput="onInput" ref="nominal" />
          <span class="font-bold" :class="classStatus">{{ status }} : {{ cash }}</span>
        </div>
        <button
          class="btn my-5 w-1/2 bg-color1 border-color1 hover:bg-color2 hover:border-color2"
          @click="clickPay"
        >
          Bayar
        </button>
        <button
          class="btn w-1/2 bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700"
          @click="cancelPay"
        >
          Batal
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";

export default {
  data() {
    return {
      cash: "",
      classStatus: "",
      status: "",
      isCash:'',
      isBank:''
    };
  },
  props: {
    typePay: "",
    namePay: "",
    total: "",
  },
  components: {
    Input,
  },
  methods: {
    formatMoney(money){
      const arrMoney = money.toString().split('')
      let dot = 0
      for(let i = arrMoney.length-1 ; i >= 0 ; i-- ){
          dot ++
          if (dot % 3 == 0 ){
              arrMoney.splice(i,0,'.')
          }
      }
      if (arrMoney[0] == '.')arrMoney.splice(0,1)
      return arrMoney.join('')
    },
    cancelPay() {
      this.$emit("cancelPay");
    },
    onInput(val) {
      console.log(parseInt(this.total.split('.').join('')))
      const nominal = parseInt(val);
      const result = nominal - parseInt(this.total.split('.').join(''));
      this.cash = this.formatMoney(result);
      if (result < 0) {
        this.classStatus = "text-red-500";
        this.status = "kurang";
      } else if(result >= 0) {
        this.classStatus = "text-green-500";
        this.status = "kembalian";
      }
      if(isNaN(result)){
          this.classStatus = "text-red-500";
          this.status = "nominal tidak valid";
          this.cash = ''
      }
      if (val == ''){
          this.classStatus = "text-yellow-500";
          this.status = "masukkan nominal";
          this.cash = ''
      }
    },
    clickPay() {
      this.$swal
        .fire({
          title: "Yakin ingin membayar?",
          showCancelButton: true,
          confirmButtonText: "Bayar",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$emit("paySuccess");
          }
        });
    },
  },
  updated() {
    window.addEventListener("keydown", this.isInput);
    const ref = this.$refs
    const namePay = ref.namePay.innerHTML
    console.log(namePay.toLowerCase())
    if (namePay.toLowerCase() == 'cash'){
      console.log('benar')
      this.isBank = false
      this.isCash = true
    }else{
      this.isBank = true
      this.isCash = false
    }
  },
};
</script>

<style></style>
