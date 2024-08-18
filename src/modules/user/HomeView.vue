<script setup lang="ts">
import NamazCard from "@/modules/user/components/NamazCard.vue";
import {BASE_URL} from "@/global";
import type Response from "@/models/ApiResponse";
import axios from "axios";
import Sunrise from "@/assets/sunrise.png";
import Sunset from "@/assets/sunset.png";
import {computed, onMounted, ref, watch} from "vue";
import type ApiResponse from "@/models/ApiResponse";
import {useUserStore} from "@/stores/userStore";
import {Namaz} from "@/enums/Namaz";
import TableLayout from "@/layouts/TableLayout.vue";

const isLoading = ref(true);
let response: ApiResponse<any>;

let todayNamazData: any;
const currentTime = ref(new Date().toLocaleTimeString());

const currentNamaz = ref("Fajr");

const nextNamaz = computed(() => {
  switch (currentNamaz.value) {
    case Namaz.FAJR:
      return Namaz.ZUHR;
    case Namaz.ZUHR:
      return Namaz.ASR;
    case Namaz.ASR:
      return Namaz.MAGHRIB;
    case Namaz.MAGHRIB:
      return Namaz.ISHA;
    default:
      return Namaz.ISHA;
  }
});

let nextNamazTime;

const timeDifference = ref(0);

const userStore = useUserStore();

const masjidData = userStore.user!.id

console.log(masjidData);

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

//checks the time and returns whichever namaz is currently ongoing
function getNextNamazAccordingToTime(
    time: string,
    fajr_azan: string,
    fajr_jamat: string,
    zuhr_azan: string,
    zuhr_jamat: string,
    asr_azan: string,
    asr_jamat: string,
    maghrib_azan: string,
    maghrib_jamat: string,
    isha_azan: string,
    isha_jamat: string,
    namaz: string
) {
  if (time >= fajr_azan && time < fajr_jamat) {
    namaz = "Fajr";
  } else if (time >= fajr_jamat && time < zuhr_jamat) {
    namaz = "Zuhr";
  } else if (time >= zuhr_jamat && time < asr_jamat) {
    namaz = "Asr";
  } else if (time >= asr_jamat && time < maghrib_jamat) {
    namaz = "Maghrib";
  } else {
    namaz = "Isha";
  }

  return namaz;
}

function createNamazTableFromData(todaysDate: string) {
  currentNamaz.value = getNextNamazAccordingToTime(
      currentTime.value,
      response.data.fajr_namaz,
      response.data.fajr_jamat,
      response.data.zuhr_namaz,
      response.data.zuhr_jamat,
      response.data.asr_namaz,
      response.data.asr_jamat,
      response.data.maghrib_namaz,
      response.data.maghrib_jamat,
      response.data.isha_namaz,
      response.data.isha_jamat,
      currentNamaz.value
  );

  console.log(currentNamaz.value);

  if (currentNamaz.value == "Fajr") {
    nextNamazTime = response.data.fajr_namaz.toString();
  } else if (currentNamaz.value == "Zuhr") {
    nextNamazTime = response.data.zuhr_namaz.toString();
  } else if (currentNamaz.value == "Asr") {
    nextNamazTime = response.data.asr_namaz.toString();
  } else if (currentNamaz.value == "Maghrib") {
    nextNamazTime = response.data.maghrib_namaz.toString();
  } else {
    nextNamazTime = response.data.isha_namaz.toString();
  }
  console.log(nextNamazTime);

  timeDifference.value = getDifferenceBetweenTwoTimes(
      todaysDate,
      nextNamazTime,
      currentTime.value
  );

  console.log(currentNamaz.value);

  todayNamazData = [
    {
      name: "Fajr",
      icon: Sunrise,
      startTime: response.data.fajr_namaz,
      endTime: response.data.fajr_jamat,
      condition: currentNamaz.value == "Fajr",
    },
    {
      name: "Zuhr",
      icon: Sunrise,
      startTime: response.data.zuhr_namaz,
      endTime: response.data.zuhr_jamat,
      condition: currentNamaz.value == "Zuhr",
    },
    {
      name: "Asr",
      icon: Sunrise,
      startTime: response.data.asr_namaz,
      endTime: response.data.asr_jamat,
      condition: currentNamaz.value == "Asr",
    },
    {
      name: "Maghrib",
      icon: Sunset,
      startTime: response.data.maghrib_namaz,
      endTime: response.data.maghrib_jamat,
      condition: currentNamaz.value == "Maghrib",
    },
    {
      name: "Isha",
      icon: Sunset,
      startTime: response.data.isha_namaz,
      endTime: response.data.isha_jamat,
      condition: currentNamaz.value == "Isha",
    },
  ];
}

onMounted(async () => {
  const todaysDate = new Date().toISOString().substring(0, 10);
  response = await (
      await axios(`${BASE_URL}/namaz/user/${masjidData}/date/${todaysDate}`)
  ).data;
  createNamazTableFromData(todaysDate);

  console.log(currentNamaz.value);

  isLoading.value = false;
});

// used to make the clock tick in time backwards,
//until it reaches zero and hence a function is trigggered,
// to get the current namaz according to the time
setInterval(() => {
  if (timeDifference.value > 0) {
    timeDifference.value--;
  } else {
    const todaysDate = new Date().toISOString().substring(0, 10);
    console.log(todaysDate);

    currentTime.value = new Date().toLocaleTimeString();
    createNamazTableFromData(todaysDate);
  }
}, 1000);
</script>

<template>
  <template v-if="isLoading">
    <h1>Loading</h1>
  </template>
  <template v-else>
    <div class="p-4 mx-auto max-w-[800px] text-xl lg:text-2xl">
      <h2 class="font-semibold text-lg text-gray-800">Mumbai, India</h2>
      <div class="flex justify-between items-center">
        <div>
          <p class="text-gray-600 font-medium text-xl">
            Next Namaz: {{ currentNamaz }} in
            {{ secondsToHms(timeDifference) }}
          </p>
        </div>
        <img src="@/assets/mosque.png" alt="" width="80" height="150"/>
      </div>
      <div>
        <p class="text-gray-600 mb-3">Date</p>
        <h2 class="text-2xl font-medium">17 Jummada Al-Awwal 1445</h2>
        <h3 class="text-xl text-gray-500 font-medium mb-10">
          {{ new Date().toUTCString().slice(0, -12) }}
        </h3>
        <div class="flex justify-center">
          <TableLayout>
            <tr class="bg-green-100 h-[50px] px-4 py-2">
              <td class="w-[200px] p-4">
                <p class="font-medium text-black">Namaz</p>
              </td>
              <td class="w-[200px] p-4">
                <p class="font-semibold text-black">Start Time</p>
              </td>
              <td class="p-4">
                <p class="font-semibold text-black">End Time</p>
              </td>
            </tr>
            <template v-for="namaz in todayNamazData">
              <NamazCard
                  :name="namaz.name"
                  :icon="namaz.icon"
                  :startTime="namaz.startTime"
                  :end-time="namaz.endTime"
                  :is-ongoing="namaz.condition"
              />
            </template>
          </TableLayout>
        </div>
      </div>
    </div>
  </template>
</template>
