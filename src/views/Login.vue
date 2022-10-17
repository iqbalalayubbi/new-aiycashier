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
        />
        <Input
          nama="password"
          type="password"
          @onInput="onInput($event, 'password')"
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
            isLoad :false
        }
    },
    components:{Input},
    methods:{
        async clickBtn(menu){
            if (menu == 'masuk'){
                this.isLoad = true
                try {
                    const result = await axios.post('https://aiycashier.herokuapp.com/login',{
                        username:this.username,
                        password:this.password
                    })
                    const data = result.data
                    localStorage.setItem('token',JSON.stringify(data.token))
                    this.$swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: data.status,
                        text:data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(res => {
                        if (data.isNew){
                            this.$router.push('/shop/data')
                        }else{
                            this.$router.push('/dashboard')
                        }
                    })
                } catch (error) {
                    if (error){
                        const data = error.response.data
                        this.$swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: data.status,
                            text:data.msg,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                this.isLoad = false
                }
        },
        onInput(val,name){
            if(name == 'username') this.username = val
            else this.password = val
        }
    }
}
</script>

<style></style>
