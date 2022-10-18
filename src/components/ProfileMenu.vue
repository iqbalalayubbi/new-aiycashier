<template>
    <div class="dropdown dropdown-end" @click="this.$router.push('/profile')">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
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