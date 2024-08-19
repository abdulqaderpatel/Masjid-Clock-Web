<script setup lang="ts">
import NamazFileInput from "@/modules/masjid/components/NamazFileInput.vue";
import {ref} from "vue";
import axios from "axios";
import {BASE_URL} from "@/global";
import AppButton from "@/components/AppButton.vue";
import Modal from "@/components/popup/Modal.vue";

const selectedFile = ref(null);

const isModalShow = ref(false);
const handleFileUpload = (event: any) => {
  selectedFile.value = event.target.files[0];

};

const submitFile = async () => {
  if (!selectedFile.value) {
    alert('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  formData.append('id', "1");

  try {
    const response = await axios.post(`${BASE_URL}/masjid/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('File uploaded successfully:', response.data);
    isModalShow.value = true;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};


</script>

<template>
  <div class="mx-auto h-screen flex flex-col justify-center items-center p-4">
    <Modal title="File Uploaded" message="" :show="isModalShow" @close="isModalShow=false"/>
    <h1 class="text-xl font-bold mb-5">Add a Namaz File to upload</h1>
    <NamazFileInput @change="handleFileUpload" :is-uploaded="selectedFile!=null" class="mb-5"/>
    <AppButton @click="submitFile" title="upload"/>
  </div>
</template>

<style scoped></style>
