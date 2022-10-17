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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="(employe, i) in employes" :key="i">
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img
                    src="https://placeimg.com/80/80/people"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ employe.username }}</div>
                <div class="text-sm opacity-50">{{ employe.role }}</div>
              </div>
            </div>
          </td>
          <td>
            {{ employe.name }}
          </td>
          <td>{{ employe.no_hp }}</td>
          <th>
            <button
              class="btn btn-ghost btn-xs"
              @click="clickDetail(employe.username)"
            >
              lihat
            </button>
          </th>
          <th>
            <button
              class="btn bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 btn-xs"
              @click="clickDel(employe.username)"
            >
              berhentikan
            </button>
          </th>
        </tr>
      </tbody>
    </table>
    <div
      v-show="isLoad"
      class="w-screen absolute top-0 left-0 h-screen bg-black opacity-50 z-[20]"
    ></div>
    <Icon
      v-show="isLoad"
      icon="line-md:loading-loop"
      class="text-9xl text-slate-200 z-[20] absolute top-60 left-0 mx-auto w-full"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employes: [],
      dataEmployes: [],
      isLoad: false,
    };
  },
  methods: {
    clickDetail(username) {
      this.$router.push(`/employe/${username}`);
    },
    clickDel(username) {
      this.$swal
        .fire({
          title: "Ingin berhentikan karyawan?",
          text: "kamu akan menghapus karyawan ini",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Berhentikan",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.isLoad = true;
            const token = JSON.parse(localStorage.getItem('token'))
            axios
              .delete(
                `https://aiycashier.herokuapp.com/employe/${username}/${token}`
              )
              .finally(() => this.isLoad = false)
              .then(() => {
                this.employes.forEach((employe,i) =>{
                  if (employe.username == username)this.employes.splice(i,1)
                })
                // window.location.reload()
              });
          }
        });
    },
  },
  created() {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`https://aiycashier.herokuapp.com/employe/${token}`)
      .then((res) => {
        const data = res.data;
        this.employes = data.data;
        this.dataEmployes = data.data;
      });
  },
};
</script>

<style></style>
