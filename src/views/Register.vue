<template>
  <div class="lg:block flex justify-center">
    <router-link to="/">
      <img
        src="../assets/logo-black.png"
        alt=""
        width="130"
        class="absolute top-5 left-5 hidden lg:block"
      />
    </router-link>
    <div class="lg:ml-40 lg:mt-28 mt-20 flex flex-col w-3/4 lg:w-1/4">
      <router-link to="/" class="self-center">
        <img
          src="../assets/logo-black.png"
          alt=""
          class="lg:hidden w-40 mb-10"
        />
      </router-link>
      <h1 class="text-4xl font-bold self-center lg:self-start">
        Buat Akun Baru
      </h1>
      <div class="flex flex-col gap-3 mt-5">
        <Input nama="username" ref="username" type="text" @onInput="onInput" @onFocus="onFocus('username')"/>
        <Input
          nama="password"
          ref="password"
          type="password"
          :statusName="statusName"
          :statusClass="statusClass"
          @onInput="onInput"
          @onFocus="onFocus('password')"
        />
        <Input
          nama="confirmasi password"
          ref="confirmPass"
          type="password"
          @onInput="onInput"
          @onFocus="onFocus('confirmPass')"
        />
      </div>
      <button
        class="btn mt-5 bg-color1 border-color1 hover:bg-color2 hover:border-color2"
        @click="clickBtn('buat')"
        ref="button"
      >
        Buat Akun
      </button>
      <p class="text-center mt-3">
        Sudah memiliki akun ?
        <span
          class="font-bold hover:cursor-pointer hover:text-color1"
          @click="this.$router.push('/login')"
          >Masuk</span
        >
      </p>
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
    <img
      src="../assets/ilustrasi2.svg"
      alt=""
      class="absolute right-20 top-40 w-1/3 lg:block hidden"
    />
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import axios from "axios";

export default {
  data() {
    return {
      isLoad: false,
      inFocus: "username",
      isValid:false
    };
  },
  components: { Input },
  methods: {
    async clickBtn(menu) {
      if (menu == "buat")this.register()
    },
    onFocus(el){
      this.inFocus = el
    },
    onInput() {
      const ref = this.$refs;
      const username = ref.username.$refs.input.value;
      const password = ref.password.$refs.input.value;
      const confirmPass = ref.confirmPass.$refs.input.value;
      const button = ref.button;
      if (
        confirmPass == password &&
        confirmPass.length !== 0 &&
        username.length !== 0
      ) {
         this.isValid = true 
        button.disabled = false;
      } else {
         this.isValid = false 
        button.disabled = true;
      }
    },
    onKeyboard(e) {
      const key = e.key;
      if (key == "Enter") {
         const ref = this.$refs;
         console.log(ref.password.$refs.input)
         if (this.inFocus == 'username') {
            this.inFocus = 'password'
            ref.password.$refs.input.focus()
         }
         else if (this.inFocus == 'password') {
            ref.confirmPass.$refs.input.focus()
            this.inFocus = 'confirmPass'
         }
         else if(this.inFocus == 'confirmPass' && this.isValid){
            this.inFocus = 'username'
            this.register()
         }
      }
    },
    register() {
      this.isLoad = true;
      const ref = this.$refs;
      const password = ref.password.$refs.input.value;
      const username = ref.username.$refs.input.value;
      axios
        .post("https://aiycashier.herokuapp.com/register", {
          username,
          password,
        })
        .finally(() => (this.isLoad = false))
        .then(() => {
          this.$swal
            .fire({
              position: "center",
              icon: "success",
              title: "akun berhasil dibuat",
              showConfirmButton: false,
              timer: 1500,
            })
            .then(() => this.$router.push("/login"));
        })
        .catch((err) => {
          const data = err.response.data;
          this.$swal
            .fire({
              position: "center",
              icon: "error",
              title: data.status,
              text: data.msg,
              showConfirmButton: false,
              timer: 2000,
            })
            .then(() => {
               ref.username.$refs.input.value = ''
               ref.password.$refs.input.value = ''
               ref.confirmPass.$refs.input.value =''
               this.$router.push("/register")
            });
        });
    },
  },
  mounted() {
    const button = this.$refs.button;
    const ref = this.$refs;
    ref.username.$refs.input.focus();
    button.setAttribute("disabled", true);
  },
  created(){
     document.addEventListener("keydown", this.onKeyboard);
  }
};
</script>

<style></style>
