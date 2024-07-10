<template>
  <div class="container mx-auto p-4 max-w-90 flex flex-col items-center gap-2">
    <h1 class="font-bold text-4xl self-start">Welcome to Masjid Clock</h1>
    <p class="text-gray-800 text-base mb-8">
      Upload your masjid time table and we will handle it Lorem ipsum dolor sit
      amet consectetur adipisicing elit. Illum, harum.
    </p>
    <form class="flex flex-col" @click.prevent="">
      <AuthLabel title="Name" />
      <AuthInputBox
        class="mb-2"
        variable="formData.name"
        placeholder="Enter Name"
      />
      <AuthLabel title="Email" />
      <AuthInputBox
        class="mb-2"
        :variable="formData.email"
        placeholder="Enter Email Address"
      />
      <AuthLabel title="Password" />
      <AuthInputBox
        class="mb-4"
        :variable="formData.password"
        placeholder="Enter Password"
      />
      <AppButton title="Register" @buttonClick="signup" />
    </form>
  </div>
</template>

<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
import AuthInputBox from "@/components/AuthInputBox.vue";
import AuthLabel from "@/components/AuthLabel.vue";
import { ref } from "vue";

const formData = ref({
  name: "",
  email: "",
  password: "",
});

function signup() {}
</script>

<style scoped></style>
