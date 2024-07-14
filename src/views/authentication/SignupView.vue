<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
import AuthInputBox from "@/components/AuthInputBox.vue";
import AuthLabel from "@/components/AuthLabel.vue";
import { Input } from "@/enums/Input";
import { BASE_URL } from "@/global";
import axios from "axios";
import { ref } from "vue";

const formData = ref({
  name: "",
  email: "",
  password: "",
  country: "",
  state: "",
  city: "",
  address: "",
});

function signup() {
  console.log(Input.TEXT);

  axios
    .post(`${BASE_URL}/user/register`, {
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
      country: formData.value.country,
      state: formData.value.state,
      city: formData.value.city,
      address: formData.value.address,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  console.log(formData.value);
}
</script>
<template>
  <div class="container mx-auto p-4 max-w-90 flex flex-col items-center gap-2">
    <h1 class="font-bold text-4xl self-center">Welcome to Masjid Clock</h1>
    <p class="text-gray-800 text-base mb-4">
      Upload your masjid time table and we will handle it Lorem ipsum dolor sit
      amet consectetur adipisicing elit. Illum, harum.
    </p>
    <form class="flex flex-col" @submit.prevent="signup">
      <AuthLabel title="Name" />
      <AuthInputBox v-model="formData.name" placeholder="Enter Namjkje" />
      <AuthLabel title="Email" />
      <AuthInputBox
        v-model="formData.email"
        placeholder="Enter Email Address"
        :input-type="Input.EMAIL"
      />
      <AuthLabel title="Password" />
      <AuthInputBox
        v-model="formData.password"
        placeholder="Enter Password"
        :input-type="Input.PASSWORD"
      />

      <AuthLabel title="Country" />
      <country-select
        class="shadow bg-white border-gray-400 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block mb-4"
        v-model="formData.country"
        :country="formData.country"
        topCountry="US"
      />
      <AuthLabel title="Region" />
      <region-select
        class="shadow bg-white border-gray-400 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block mb-4"
        v-model="formData.state"
        :country="formData.country"
        :region="formData.state"
      />

      <AuthLabel title="City" />
      <AuthInputBox class="mb-4" v-model="formData.city" placeholder="fsfsd" />
      <AuthLabel title="Address" />
      <textarea
        type="text"
        v-model="formData.address"
        placeholder="Enter Address"
        rows="4"
        class="shadow border-gray-400 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block mb-8"
      />
      <AppButton title="Register" />
    </form>
  </div>
</template>

<style scoped></style>
