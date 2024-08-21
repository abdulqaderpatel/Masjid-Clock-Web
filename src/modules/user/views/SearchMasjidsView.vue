<script setup lang="ts">
import AppSearchBar from "@/components/AppSearchBar.vue";
import {ref, onUnmounted} from "vue";
import DataLoadingSpinner from "@/components/spinners/DataLoadingSpinner.vue";
import type User from "@/models/User";
import axios from "axios";
import {BASE_URL} from "@/global";

const searchText = ref("");
const isLoading = ref(false);
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
  } finally {
    isLoading.value = false;
  }
};

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


    <div v-if="masjidList.length > 0">
      <div v-for="masjid in masjidList" :key="masjid.id">
        <h1>{{ masjid.name }}</h1>
      </div>
    </div>
    <div v-else>
      <h1>No masjids found</h1>
    </div>

  </div>
</template>

<style scoped>
/* Your styles here */
</style>
