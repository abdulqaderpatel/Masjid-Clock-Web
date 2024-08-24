<script setup lang="ts">
import MailSent from "@/components/icons/MailSent.vue";
import MailVerified from "@/components/icons/MailVerified.vue";
import {AUTH_TOKEN, BASE_URL} from "@/global";
import axios from "axios";

import {ref} from "vue";
import {useUserStore} from "@/stores/userStore";
import {UserType} from "@/enums/UserType";

const isVerified = ref(false);
const userStore = useUserStore();
setInterval(() => {
  if (userStore.user?.type == UserType.MASJID) {
    axios
        .get(`${BASE_URL}/masjid/isVerified`, {
          headers: {
            "auth-token": `bearer ${localStorage.getItem(AUTH_TOKEN)}`,
          },
        })
        .then(() => {
          isVerified.value = true;
        })
        .catch((error) => {
          if (error.response) {

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {

            console.log(error.request);
          } else {

            console.log("Error", error.message);
          }
        });
  } else {
    axios
        .get(`${BASE_URL}/user/isVerified`, {
          headers: {
            "auth-token": `bearer ${localStorage.getItem(AUTH_TOKEN)}`,
          },
        })
        .then(() => {
          isVerified.value = true;
        })
        .catch((error) => {
          if (error.response) {


          } else if (error.request) {

            console.log(error.request);
          } else {
            
            console.log("Error", error.message);
          }
        })
  }
}, 1000);
</script>

<template>
  <template v-if="!isVerified">
    <div class="w-max mx-auto my-auto flex flex-col items-center gap-5 p-4">
      <MailSent/>

      <h1 class="font-bold text-3xl text-center">
        An email has been sent to you
      </h1>
      <p class="font-medium text-xl">Click on it to verify</p>
    </div>
  </template>
  <template v-else>
    <div class="w-max mx-auto my-auto flex flex-col items-center gap-5 p-4">
      <MailVerified/>

      <h1 class="font-bold text-3xl text-center">
        Your email has been verified
      </h1>
      <p class="font-medium text-xl">You can close this page</p>
    </div>
  </template>
</template>

<style scoped></style>
