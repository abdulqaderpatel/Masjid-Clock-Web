<script setup lang="ts">
import {RouterView} from "vue-router";
import {AUTH_TOKEN, BASE_URL, TYPE} from "./global";
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

  console.log(authToken)
  if (authToken == null) {
    isLoading.value = false;
    console.log(userStore.isVerified);
    await router.push("/signup");
    return;

  }

  try {
    const masjidData: User = jwtDecode(authToken || '');
    userStore.setUser(masjidData);

    const isMasjid = await axios.get(`${BASE_URL}/masjid/isMasjid/${userStore.user!.email}`);

    console.log(isMasjid.data.data);
    if (isMasjid.data.data) {
      masjidData.type = UserType.MASJID
    } else {
      masjidData.type = UserType.USER;
    }

    console.log(masjidData.type);

    const response = await axios.get(`${BASE_URL}/${masjidData.type}/isVerified`, {
      headers: {
        "auth-token": `bearer ${authToken}`,
      },
    });

    console.log(response.data)

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
    <template v-if="userStore.isVerified">

      <UserNavigationBar v-if="type == UserType.USER" class="mb-20"/>
      <MasjidNavigationBar v-if="type == UserType.MASJID"/>
    </template>
    <RouterView class="mt-20" :class="{'mt-0':!userStore.isVerified}"/>
  </div>
</template>
