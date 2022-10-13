<template>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabindex="0" class="left-10 menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52" v-show="isOpen">
        <li>
          <a class="justify-between">
            Profile
          </a>
        </li>
        <li><a>Logout</a></li>
      </ul>
    </div>
</template>

<script>
export default {
    props:{
        isOpen:Boolean
    }
}
</script>

<style>

</style>