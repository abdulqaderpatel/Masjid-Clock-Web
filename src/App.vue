<script setup lang="ts">
import {RouterView} from "vue-router";
import {AUTH_TOKEN, BASE_URL} from "./global";
import router from "./router";
import axios from "axios";
import {onMounted, ref} from "vue";
import {useMasjidStore} from "./stores/masjidStore";
import type Masjid from "./models/Masjid";
import {jwtDecode} from "jwt-decode";

import UserNavigationBar from "@/components/navigation/UserNavigationBar.vue";

const masjidStore = useMasjidStore();

const isLoading = ref(true);

onMounted(async () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  console.log(authToken)
  if (authToken == null) {
    isLoading.value = false;
    console.log(masjidStore.isVerified);
    await router.push("/signup");
    return;

  }

  try {
    const masjidData: Masjid = jwtDecode(authToken || '');
    masjidStore.setMasjid(masjidData);

    const response = await axios.get(`${BASE_URL}/masjid/isVerified`, {
      headers: {
        "auth-token": `bearer ${authToken}`,
      },
    });

    // Ensure this sets the verification state
    isLoading.value = false;

    await router.push("/");
  } catch (e) {
    isLoading.value = false;
    await router.push("/verifyEmail");
  }
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>

    <UserNavigationBar v-if="masjidStore.isVerified"/>
    <RouterView class="mt-20" :class="{'mt-0':!masjidStore.isVerified}"/>
  </div>
</template>
