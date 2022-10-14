<template>
  <div class="overflow-x-auto w-full">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>username</th>
        <th>nama</th>
        <th>no hp</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(employe,i) in employes" :key="i">
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img src="https://placeimg.com/80/80/people" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">{{employe.username}}</div>
              <div class="text-sm opacity-50">{{employe.role}}</div>
            </div>
          </div>
        </td>
        <td>
          {{employe.name}}
        </td>
        <td>{{employe.no_hp}}</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>    
  </table>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      employes:[]
    }
  },
  created(){
    const token = JSON.parse(localStorage.getItem('token'))
    axios.get(`http://localhost:3000/employe/${token}`).then(res => {
        const data = res.data
        this.employes = data.data
    })
  }
}
</script>

<style>

</style>