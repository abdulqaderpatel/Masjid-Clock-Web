<script setup lang="ts">
import NamazCard from "@/components/namaz/NamazCard.vue";
import { BASE_URL } from "@/global";
import type Response from "@/models/Response";
import axios from "axios";
import Sunrise from "@/assets/sunrise.png";
import Sunset from "@/assets/sunset.png";
import { onMounted, ref } from "vue";

const isLoading = ref(true);
let response: Response;

let todayNamazData: any;
const currentTime = new Date().toLocaleTimeString();
console.log(currentTime);
onMounted(async () => {
  const todaysDate = new Date().toISOString().substring(0, 10);
  response = await (await axios(`${BASE_URL}/namaz/date/${todaysDate}`)).data;

  console.log(response.data.fajr_namaz);

  todayNamazData = [
    {
      name: "Fajr",
      icon: Sunrise,
      value: response.data.fajr_namaz,
      condition: currentTime < response.data.fajr_namaz,
    },
    {
      name: "Zuhr",
      icon: Sunrise,
      value: response.data.zuhr_namaz,
      condition:
        currentTime >= response.data.fajr_namaz &&
        currentTime < response.data.zuhr_namaz,
    },
    {
      name: "Asr",
      icon: Sunrise,
      value: response.data.asr_namaz,
      condition:
        currentTime >= response.data.zuhr_namaz &&
        currentTime < response.data.asr_namaz,
    },
    {
      name: "Maghrib",
      icon: Sunset,
      value: response.data.maghrib_namaz,
      condition:
        currentTime >= response.data.asr_namaz &&
        currentTime < response.data.maghrib_namaz,
    },
    {
      name: "Isha",
      icon: Sunset,
      value: response.data.isha_namaz,
      condition: currentTime >= response.data.maghrib_namaz,
    },
  ];
  isLoading.value = false;
});
</script>

<template>
  <template v-if="isLoading">
    <h1>Loading</h1>
  </template>
  <template v-else>
    <div class="p-4 container text-sm">
      <h2>Mumbai, India</h2>
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-4xl font-semibold">12:10</h1>
          <p class="text-gray-600">Asr in 3 hrs 10 mins</p>
        </div>
        <img src="../assets/mosque.png" alt="" width="80" height="150" />
      </div>
      <div>
        <p class="text-gray-600">Date</p>
        <h2 class="text-2xl font-medium">17 Jummada Al-Awwal 1445</h2>
        <h3 class="text-xl text-gray-500 font-medium mb-3">
          Sat, 15 December 2023
        </h3>
        <template v-for="namaz in todayNamazData"
          ><NamazCard
            :name="namaz.name"
            :icon="namaz.icon"
            :time="namaz.value"
            :is-ongoing="namaz.condition"
        /></template>
      </div>
    </div>
  </template>
</template>
