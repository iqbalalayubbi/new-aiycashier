<template>
    <div class="dropdown dropdown-end" @click="this.$router.push('/profile')">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img :src="src"/>
        </div>
      </label>
    </div>
</template>

<script>
import axios from 'axios'
import path from '../utils/path.js'
import img from '../assets/default.svg'

export default {
    data(){
      return{
        src:img
      }
    },
    props:{
        isOpen:Boolean
    },
    created(){
        const token = JSON.parse(localStorage.getItem("token"));
        axios.get(`${path}user/${token}`).then(res => {
          const data = res.data[0]
          if(data.image !== undefined)this.src = data.image
          
        })
    }
}
</script>

<style>

</style>