<template>
  <div>
    <img :src="src" alt="">
    <input type="file" @change="onFileChange" name="image"/>
    <!-- <input type="text"/> -->
    <button
      @click="onUploadFile"
      class="upload-button btn"
      :disabled="!this.selectedFile"
    >
      Upload file
    </button>
  </div>
</template>

<script>
import axios from "axios";
import path from '../utils/path'

export default {
  data(){
    return{
        selectedFile: "",
        src:''
    }
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    onUploadFile() {
      const token = JSON.parse(localStorage.getItem('token'))
      const formData = new FormData();
      formData.append("image", this.selectedFile);  
      
      axios
        .post(`${path}upload/user/${token}`,formData)
        .then(res => {
          this.src = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
