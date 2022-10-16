<template>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabindex="0" class="left-10 menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52" v-show="isOpen">
        <li @click="clickProfile">
          <a class="justify-between">
            Profile
          </a>
        </li>
        <li @click="this.$router.push({ path: '/login', replace: true })"><a>Logout</a></li>
      </ul>
    </div>
</template>

<script>
export default {
    props:{
        isOpen:Boolean
    },
    methods:{
      clickProfile(){
        this.$router.push('/profile')
      }
    }
}
</script>

<style>

</style>