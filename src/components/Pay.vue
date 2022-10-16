<template>
  <div>
    <div class="flex flex-col items-center">
      <ul
        class="menu bg-base-100 w-1/2 p-2 rounded-md flex flex-col items-center"
      >
        <li @click="methodPay('bri')">
          <a>
            <img src="../assets/bank/bri.svg" alt="" />
            BRI
          </a>
        </li>
        <span class="text-center text-xl mt-5">Total : </span>
        <span class="text-center font-bold text-2xl">Rp50.000</span>
        <button
          class="btn my-5 w-1/2 bg-color1 border-color1 hover:bg-color2 hover:border-color2"
          @click="clickPay"
        >
          Bayar
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    methodPay(type) {
      this.$emit("choosePay", type);
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
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Pembayran Berhasil",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
                this.$emit('paySuccess')
            })
          }
        });
    },
  },
};
</script>

<style></style>
