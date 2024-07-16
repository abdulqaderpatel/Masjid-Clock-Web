<script setup lang="ts">
import NamazCard from "@/components/namaz/NamazCard.vue";
import { BASE_URL } from "@/global";
import type Response from "@/models/Response";
import axios from "axios";
import Sunrise from "@/assets/sunrise.png";
import Sunset from "@/assets/sunset.png";
import { onMounted, ref, watch } from "vue";

const isLoading = ref(true);
let response: Response;

let todayNamazData: any;
const currentTime = new Date().toLocaleTimeString();

let currentNamaz = "Fajr";

//get time difference between two dates in seconds
function getDifferenceBetweenTwoTimes(
  date: string,
  namazTime: string,
  currentTime: string
) {
  console.log(namazTime);
  console.log(currentTime);

  const namazDate = new Date(date + "T" + namazTime.toString());
  const currentDate = new Date(date + "T" + currentTime.toString());

  return (namazDate.getTime() - currentDate.getTime()) / 1000;
}
//convert seconds to hh:mms:ss format
function secondsToHms(sec: any) {
  var hours: any = Math.floor(sec / 3600);
  hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
  var min: any = Math.floor(sec / 60);
  min >= 1 ? (sec = sec - min * 60) : (min = "00");
  sec < 1 ? (sec = "00") : void 0;

  min.toString().length == 1 ? (min = "0" + min) : void 0;
  sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

  return hours + ":" + min + ":" + sec;
}

const timeDifference = ref(0);

onMounted(async () => {
  const todaysDate = new Date().toISOString().substring(0, 10);
  response = await (await axios(`${BASE_URL}/namaz/date/${todaysDate}`)).data;

  console.log(new Date().getFullYear());

  timeDifference.value = getDifferenceBetweenTwoTimes(
    todaysDate,
    response.data.maghrib_namaz.toString(),
    currentTime
  );

  console.log(secondsToHms(timeDifference.value));

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

  if (currentTime < response.data.fajr_namaz) {
    currentNamaz = "Fajr";
  } else if (
    currentTime >= response.data.fajr_namaz &&
    currentTime < response.data.zuhr_namaz
  ) {
    currentNamaz = "Zuhr";
  } else if (
    currentTime >= response.data.zuhr_namaz &&
    currentTime < response.data.asr_namaz
  ) {
    currentNamaz = "Asr";
  } else if (
    currentTime >= response.data.asr_namaz &&
    currentTime < response.data.maghrib_namaz
  ) {
    currentNamaz = "Maghrib";
  } else {
    currentNamaz = "Isha";
  }

  isLoading.value = false;
});

setInterval(() => {
  if (timeDifference.value > 0) {
    timeDifference.value--;
  }
}, 1000);

// Watch the timeDifference and log its value whenever it changes
watch(timeDifference, (newVal) => {
  console.log(newVal);
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
          <h1 class="text-4xl font-semibold">{{}}</h1>
          <p class="text-gray-600">
            {{ currentNamaz }} in {{ secondsToHms(timeDifference) }}
          </p>
        </div>
        <img src="../assets/mosque.png" alt="" width="80" height="150" />
      </div>
      <div>
        <p class="text-gray-600">Date</p>
        <h2 class="text-2xl font-medium">17 Jummada Al-Awwal 1445</h2>
        <h3 class="text-xl text-gray-500 font-medium mb-3">
          {{ new Date().toUTCString().slice(0, -12) }}
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
