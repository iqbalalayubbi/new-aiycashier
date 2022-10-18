<template>
  <div class="flex h-screen">
    <router-link to="/">
      <img
        src="../assets/logo-black.png"
        alt=""
        width="130"
        class="absolute top-5 left-5 lg:block hidden"
      />
    </router-link>
    <div class="w-full lg:w-1/2 flex justify-center items-center">
      <div class="w-3/4 lg:w-1/2 flex flex-col gap-3">
        <router-link to="/" class="self-center">
          <img
            src="../assets/logo-black.png"
            alt=""
            class="lg:hidden w-40 self-center mb-10"
          />
        </router-link>
        <h1 class="text-4xl font-bold self-center">Masuk</h1>
        <Input
          nama="username"
          type="text"
          @onInput="onInput($event, 'username')"
          ref="username"
          @onFocus="onFocus('username')"
        />
        <Input
          nama="password"
          type="password"
          @onInput="onInput($event, 'password')"
          ref="password"
          @onFocus="onFocus('password')"
        />
        <button
          class="btn mt-5 bg-color1 border-color1 hover:bg-color2 hover:border-color2"
          @click="clickBtn('masuk')"
        >
          Masuk
        </button>
        <p class="text-center mt-3">
          Belum memiliki akun ?
          <span
            class="font-bold hover:cursor-pointer hover:text-color1"
            @click="this.$router.push('/register')"
            >Daftar</span
          >
        </p>
      </div>
    </div>
    <div
      class="bg-color1 w-1/2 h-full lg:flex items-center justify-center hidden"
    >
      <img src="../assets/ilustrasi3.svg" alt="" class="w-3/4" />
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
import Input from '@/components/Input.vue'
import axios from 'axios'

export default {
    data(){
        return{
            password:'',
            username:'',
            isLoad :false,
            inFocus:'username'
        }
    },
    components:{Input},
    methods:{
        onFocus(el){
          this.inFocus = el
        },
        clickBtn(menu){
            if (menu == 'masuk')this.login()
        },
        onInput(val,name){
            if(name == 'username') this.username = val
            else this.password = val
        },
        onKeyboard(e) {
          const key = e.key;
          if (key == "Enter") {
            const ref = this.$refs;
            if (this.inFocus == 'username') {
                this.inFocus = 'password'
                ref.password.$refs.input.focus()
            }
            else if (this.inFocus == 'password') {
                this.inFocus = 'username'
                this.login()
            }
          }
        },
        login(){
          this.isLoad = true
          const ref = this.$refs
          const username = ref.username.$refs.input.value
          const password = ref.password.$refs.input.value
          axios.post('https://aiycashier.herokuapp.com/login',{username,password})
          .finally(() => this.isLoad = false)
          .then(result => {
            const data = result.data
            localStorage.setItem('token',JSON.stringify(data.token))
            this.$swal.fire({
                position: 'center',
                icon: 'success',
                title: data.status,
                text:data.msg,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                if (data.isNew){
                    this.$router.push('/shop/data')
                }else{
                    this.$router.push('/dashboard')
                }
            })
          }).catch(err => {
            if (err){
                const data = err.response.data
                this.$swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: data.status,
                    text:data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
          })
        }
    },
    mounted() {
      const ref = this.$refs;
      ref.username.$refs.input.focus();
    },
    created(){
      document.addEventListener("keydown", this.onKeyboard);
    }
}
</script>

<style></style>
