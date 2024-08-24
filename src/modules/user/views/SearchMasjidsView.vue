<script setup lang="ts">
import AppSearchBar from "@/components/AppSearchBar.vue";
import {ref, onUnmounted} from "vue";
import DataLoadingSpinner from "@/components/spinners/DataLoadingSpinner.vue";
import type User from "@/models/User";
import axios from "axios";
import {BASE_URL} from "@/global";
import FollowButton from "@/components/buttons/FollowButton.vue";
import {useUserStore} from "@/stores/userStore";
import type ApiResponse from "@/models/ApiResponse";

const userStore = useUserStore();

const searchText = ref("");
const isLoading = ref(false);
const isDataLoaded = ref(false);
const timer = ref(0);

const masjidList: any = ref([]);
let intervalId: number | null = null;

const handleChange = () => {
  if (searchText.value === '') {
    isLoading.value = false;
    return;
  }


  isLoading.value = true;
  timer.value = 0;

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    if (searchText.value !== "") {
      timer.value++;
      if (timer.value >= 1) {
        getMasjidsWithTheSpecificSubstring(searchText.value);
        clearInterval(intervalId!);
        intervalId = null;
      }
    }
  }, 1000);
};

const getMasjidsWithTheSpecificSubstring = async (substring: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/masjid/${substring}`);
    masjidList.value = response.data.data;

    console.log(masjidList.value)

  } catch (e) {
    console.error("Error fetching masjids:", e);
    masjidList.value = [];
  } finally {
    isLoading.value = false;
    isDataLoaded.value = true;
  }
  console.log(isDataLoaded.value)
};

const followMasjid = async (masjidId: number, index: Number) => {
  try {
    (
        await axios.put(`${BASE_URL}/user/masjidId`, {
          id: userStore.user!.id, masjidId: masjidId
        })
    ).data;

    userStore.user!.masjidId = masjidId;

  } catch (error) {
    console.log("Some error occuredd")
  }
}

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="mx-auto w-max p-4 flex flex-col justify-center items-center">
    <div class="flex items-center gap-2">
      <AppSearchBar v-model="searchText" @input="handleChange"/>
      <DataLoadingSpinner :is-visible="isLoading"/>
    </div>


    <template v-if="isDataLoaded">

      <div class="max-w-screen-xl mx-auto px-4 md:px-8" v-if="masjidList.length>0">

        <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table class="w-full table-auto text-sm text-left">
            <thead class="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th class="py-3 px-6">Name</th>
              <th class="py-3 px-6">State</th>
              <th class="py-3 px-6">Country</th>
              <th class="py-3 px-6">Status</th>
            </tr>
            </thead>
            <tbody class="text-gray-600 divide-y">
            <tr v-for="(item, idx) in masjidList" :key="masjidList.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.state }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.country }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <FollowButton :title="userStore.user!.masjidId==item.id?'Unfollow':'Follow'"
                              :color="userStore.user!.masjidId==item.id?'red':'blue'"
                              @click="followMasjid(item.id,idx)"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <h1>No masjids found</h1>
      </div>
    </template>


  </div>
</template>

<style scoped>
/* Your styles here */
</style>
