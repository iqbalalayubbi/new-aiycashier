<template>
  <div>
    <div class="flex flex-col items-center">
      <ul class="menu bg-base-100 w-1/2 p-2 rounded-md">
        <h1 class="font-bold text-center text-xl">Pilih Pembayaran</h1>
        <li @click="methodPay('bri')">
          <a>
            <img src="../assets/bank/bri.svg" alt="">
            BRI
          </a>
        </li>
        <li @click="methodPay('mandiri')">
          <a>
            <img src="../assets/bank/mandiri.svg" alt="">
            MANDIRI
          </a>
        </li>
        <li @click="methodPay('bca')">
          <a>
            <img src="../assets/bank/bca.svg" alt="">
            BCA
          </a>
        </li>
        <li @click="methodPay('bni')">
          <a>
            <img src="../assets/bank/bni.svg" alt="">
            BNI            
          </a>
        </li>
        <li @click="methodPay('gopay')">
          <a>
            <img src="../assets/bank/gopay.svg" alt="">
            GOPAY
          </a>
        </li>
        <li @click="methodPay('cash')">
          <a>
            <Icon icon="fa-solid:money-bill-wave-alt" class="text-green-600" width="76" height="54"/>
            CASH
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        methodPay(type){
            this.$emit('choosePay',type)
        }
    }
};
</script>

<style></style>
