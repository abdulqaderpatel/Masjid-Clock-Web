<script setup lang="ts">
import NamazCard from "@/components/namaz/NamazCard.vue";
import { BASE_URL } from "@/global";
import type Response from "@/models/ApiResponse";
import axios from "axios";
import Sunrise from "@/assets/sunrise.png";
import Sunset from "@/assets/sunset.png";
import { onMounted, ref, watch } from "vue";
import type ApiResponse from "@/models/ApiResponse";

const isLoading = ref(true);
let response: ApiResponse<any>;

let todayNamazData: any;
const currentTime = ref(new Date().toLocaleTimeString());

const currentNamaz = ref("Fajr");

let nextNamaz;

const timeDifference = ref(0);

let globalResponse: ApiResponse<any>;

// Watch the timeDifference and log its value whenever it changes

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

function getNextNamazAccordingToTime(
  time: string,
  fajr: string,
  zuhr: string,
  asr: string,
  maghrib: string,
  isha: string,
  namaz: string
) {
  if (time < fajr) {
    namaz = "Fajr";
  } else if (time >= fajr && time < zuhr) {
    namaz = "Zuhr";
  } else if (time >= zuhr && time < asr) {
    namaz = "Asr";
  } else if (time >= asr && time < maghrib) {
    namaz = "Maghrib";
  } else {
    namaz = "Isha";
  }

  return namaz;
}

onMounted(async () => {
  const todaysDate = new Date().toISOString().substring(0, 10);
  response = await (await axios(`${BASE_URL}/namaz/date/${todaysDate}`)).data;
  globalResponse = response;

  currentNamaz.value = getNextNamazAccordingToTime(
    currentTime.value,
    response.data.fajr_namaz,
    response.data.zuhr_namaz,
    response.data.asr_namaz,
    response.data.maghrib_namaz,
    response.data.isha_namaz,
    currentNamaz.value
  );

  console.log(currentNamaz.value);

  if (currentNamaz.value == "Fajr") {
    nextNamaz = response.data.fajr_namaz.toString();
  } else if (currentNamaz.value == "Zuhr") {
    nextNamaz = response.data.zuhr_namaz.toString();
  } else if (currentNamaz.value == "Asr") {
    nextNamaz = response.data.asr_namaz.toString();
  } else if (currentNamaz.value == "Maghrib") {
    nextNamaz = response.data.maghrib_namaz.toString();
  } else {
    nextNamaz = response.data.isha_namaz.toString();
  }
  console.log(nextNamaz);

  timeDifference.value = getDifferenceBetweenTwoTimes(
    todaysDate,
    nextNamaz,
    currentTime.value
  );

  console.log(currentNamaz.value);

  todayNamazData = [
    {
      name: "Fajr",
      icon: Sunrise,
      value: response.data.fajr_namaz,
      condition: currentNamaz.value == "Fajr",
    },
    {
      name: "Zuhr",
      icon: Sunrise,
      value: response.data.zuhr_namaz,
      condition: currentNamaz.value == "Zuhr",
    },
    {
      name: "Asr",
      icon: Sunrise,
      value: response.data.asr_namaz,
      condition: currentNamaz.value == "Asr",
    },
    {
      name: "Maghrib",
      icon: Sunset,
      value: response.data.maghrib_namaz,
      condition: currentNamaz.value == "Maghrib",
    },
    {
      name: "Isha",
      icon: Sunset,
      value: response.data.isha_namaz,
      condition: currentNamaz.value == "Isha",
    },
  ];
  console.log(currentNamaz.value);

  isLoading.value = false;
});

setInterval(() => {
  if (timeDifference.value > 0) {
    timeDifference.value--;
  } else {
    console.log("timepass");

    currentTime.value = new Date().toLocaleTimeString();
    currentNamaz.value = getNextNamazAccordingToTime(
      currentTime.value,
      globalResponse.data.fajr_namaz,
      globalResponse.data.zuhr_namaz,
      globalResponse.data.asr_namaz,
      globalResponse.data.maghrib_namaz,
      globalResponse.data.isha_namaz,
      currentNamaz.value
    );

    if (currentNamaz.value == "Fajr") {
      nextNamaz = globalResponse.data.fajr_namaz.toString();
    } else if (currentNamaz.value == "Zuhr") {
      nextNamaz = globalResponse.data.zuhr_namaz.toString();
    } else if (currentNamaz.value == "Asr") {
      nextNamaz = globalResponse.data.asr_namaz.toString();
    } else if (currentNamaz.value == "Maghrib") {
      nextNamaz = globalResponse.data.maghrib_namaz.toString();
    } else {
      nextNamaz = globalResponse.data.isha_namaz.toString();
    }

    timeDifference.value = getDifferenceBetweenTwoTimes(
      new Date().toISOString().substring(0, 10),
      nextNamaz,
      currentTime.value
    );

    todayNamazData = [
      {
        name: "Fajr",
        icon: Sunrise,
        value: response.data.fajr_namaz,
        condition: currentNamaz.value == "Fajr",
      },
      {
        name: "Zuhr",
        icon: Sunrise,
        value: response.data.zuhr_namaz,
        condition: currentNamaz.value == "Zuhr",
      },
      {
        name: "Asr",
        icon: Sunrise,
        value: response.data.asr_namaz,
        condition: currentNamaz.value == "Asr",
      },
      {
        name: "Maghrib",
        icon: Sunset,
        value: response.data.maghrib_namaz,
        condition: currentNamaz.value == "Maghrib",
      },
      {
        name: "Isha",
        icon: Sunset,
        value: response.data.isha_namaz,
        condition: currentNamaz.value == "Isha",
      },
    ];
  }
}, 1000);

watch(timeDifference, (newVal) => {});
</script>

<template>
  <template v-if="isLoading">
    <h1>Loading</h1>
  </template>
  <template v-else>
    <div class="p-4 container">
      <h2>Mumbai, India</h2>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-semibold">{{}}</h1>
          <p class="text-gray-600 font-medium text-xl">
            {{ currentNamaz }} in {{ secondsToHms(timeDifference) }}
          </p>
        </div>
        <img src="../assets/mosque.png" alt="" width="80" height="150" />
      </div>
      <div>
        <p class="text-gray-600 mb-3">Date</p>
        <h2 class="text-2xl font-medium">17 Jummada Al-Awwal 1445</h2>
        <h3 class="text-xl text-gray-500 font-medium mb-3">
          {{ new Date().toUTCString().slice(0, -12) }}
        </h3>
        <template v-for="namaz in todayNamazData">
          <NamazCard
            :name="namaz.name"
            :icon="namaz.icon"
            :time="namaz.value"
            :is-ongoing="namaz.condition"
          />
        </template>
      </div>
    </div>
  </template>
</template>
