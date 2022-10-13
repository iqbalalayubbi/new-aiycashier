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
      <tr>
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img src="https://placeimg.com/80/80/people" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">iqbal123</div>
              <div class="text-sm opacity-50">kasir</div>
            </div>
          </div>
        </td>
        <td>
          iqbal al-ayyubi
        </td>
        <td>08123456789</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>    
  </table>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>