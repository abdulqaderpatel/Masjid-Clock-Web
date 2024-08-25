<script setup lang="ts">
import {RouterView} from "vue-router";
import {AUTH_TOKEN, BASE_URL, getTodaysDate, TYPE} from "./global";
import router from "./router";
import axios from "axios";
import {onMounted, ref} from "vue";
import {useUserStore} from "./stores/userStore";
import type User from "./models/User";
import {jwtDecode} from "jwt-decode";

import UserNavigationBar from "@/components/navigation/UserNavigationBar.vue";
import {UserType} from "@/enums/UserType";
import MasjidNavigationBar from "@/components/navigation/MasjidNavigationBar.vue";

const userStore = useUserStore();

const isLoading = ref(true);

const type = localStorage.getItem(TYPE);
onMounted(async () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);


  if (authToken == null) {
    isLoading.value = false;

    await router.push("/signup");
    return;

  }

  try {
    const masjidData: User = jwtDecode(authToken || '');
    userStore.setUser(masjidData);

    const isMasjid = await axios.get(`${BASE_URL}/masjid/isMasjid/${userStore.user!.email}`);


    if (isMasjid.data.data) {
      masjidData.type = UserType.MASJID
    } else {
      masjidData.type = UserType.USER;

    }


    try {

      await axios.get(`${BASE_URL}/${masjidData.type}/isVerified`, {
        headers: {
          "auth-token": `bearer ${authToken}`,
        },
      });


      if (masjidData.type == UserType.USER) {
        try {
          const data = await axios.get(`${BASE_URL}/user/masjidId/${masjidData.id}`);

          // Check the status manually if needed
          if (data.status >= 400) {
            console.log("User does not have a masjid ID");
          } else {
            // If the request was successful, assign the masjidId
            masjidData.masjidId = data.data.data;
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 400) {
              console.log("User does not have a masjid ID (handled 400 error)");
            } else {
              // Handle other status codes if needed
              console.error('Error status:', error.response.status);
              console.error('Error data:', error.response.data);
            }
          } else if (error.request) {
            // Handle cases where no response was received
            console.error('No response received:', error.request);
          } else {
            // Handle other errors
            console.error('Error message:', error.message);
          }
        }

      }


      // Ensure this sets the verification state
      isLoading.value = false;

      if (masjidData.type == UserType.USER) {
        await router.push(`/namaz/${getTodaysDate()}`);
      } else {

        await router.push("/");
      }
    } catch (e) {
      console.log("timeapass")
    }


  } catch (e) {
    console.log("verify email")
    isLoading.value = false;
    await router.push("/verifyEmail");
  }
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <template v-if="userStore.isVerified">
      <UserNavigationBar v-if="type == UserType.USER"/>
      <MasjidNavigationBar v-if="type == UserType.MASJID"/>
    </template>
    <div class="content-wrapper">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
/* Ensure there's enough padding at the top of the content */
.content-wrapper {
  padding-top: 80px; /* Same as navbar height */
}
</style>
