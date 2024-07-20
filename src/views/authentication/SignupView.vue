<template>
  <div class="container mx-auto p-4 max-w-90 flex flex-col items-center gap-2">
    <h1 class="font-bold text-4xl self-center">Welcome to Masjid Clock</h1>
    <p class="text-gray-800 text-base mb-4">
      Upload your masjid time table and we will handle it Lorem ipsum dolor sit
      amet consectetur adipisicing elit. Illum, harum.
    </p>
    <form class="flex flex-col" @submit.prevent="signup">
      <AuthLabel title="Name" />
      <AuthInputBox v-model="formData.name" placeholder="Enter Name" class="mb-4" />

      <AuthLabel title="Email" />
      <AuthInputBox v-model="formData.email" placeholder="Enter Email Address" :input-type="Input.EMAIL" class="mb-4" />

      <AuthLabel title="Password" />
      <AuthInputBox v-model="formData.password" class="mb-4" placeholder="Enter Password"
        :input-type="Input.PASSWORD" />

      <AuthLabel title="Country" />
      <country-select
        class="shadow bg-white border-gray-400 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block mb-4 "
        v-model="formData.country" :country="formData.country" />

      <AuthLabel title="Region" />
      <region-select
        class="shadow bg-white border-gray-400 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block mb-4"
        v-model="formData.state" :country="formData.country" :region="formData.state" />

      <AuthLabel title="City" />
      <AuthInputBox class="mb-4" v-model="formData.city" placeholder="Enter City" />

      <AuthLabel title="Address" />
      <textarea type="text" v-model="formData.address" placeholder="Enter Address" rows="4"
        class="shadow border-gray-400 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block mb-8" />

      <AppButton title="Register" :isLoading="isButtonLoading" />
    </form>

    <Modal v-if="showModal" :show="showModal" title=" Error" :message="errorMessage" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
import AuthInputBox from "@/components/AuthInputBox.vue";
import AuthLabel from "@/components/AuthLabel.vue";
import Modal from '../../components/popup/Modal.vue';
import { Input } from "@/enums/Input";
import { BASE_URL } from "@/global";
import axios from "axios";
import { ref } from "vue";
import type ApiResponse from "@/models/ApiResponse";

const formData = ref({
  name: "",
  email: "",
  password: "",
  country: "",
  state: "",
  city: "",
  address: "",
});

const isButtonLoading = ref(false);
const showModal = ref(false);
const errorMessage = ref("");

function validateForm() {
  if (!formData.value.name) {
    return "Name is required.";
  }
  if (!formData.value.email) {
    return "Email is required.";
  }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(formData.value.email)) {
    return "The Email entered is not valid.";
  }
  if (!formData.value.password) {
    return "Password is required.";
  }
  if (!formData.value.country) {
    return "Country is required.";
  }
  if (!formData.value.state) {
    return "State is required.";
  }
  if (!formData.value.city) {
    return "City is required.";
  }
  if (!formData.value.address) {
    return "Address is required.";
  }
  return "";
}

async function signup() {
  isButtonLoading.value = true;
  setTimeout(() => {

  }, 3000)
  console.log(isButtonLoading.value);

  const error = validateForm();
  if (error) {
    isButtonLoading.value = false;
    errorMessage.value = error;
    showModal.value = true;
    return;
  }

  try {
    const response: ApiResponse<string> = (await axios.post(`${BASE_URL}/masjid/register`, formData.value)).data;

    console.log(response.data);

  }

  catch (e: any) {
    errorMessage.value = "An error occured";
    showModal.value = true;

  }

  finally {
    isButtonLoading.value = false;
  }




}
</script>

<style scoped></style>
