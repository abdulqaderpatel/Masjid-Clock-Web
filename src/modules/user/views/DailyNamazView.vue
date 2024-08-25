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
import LeftArrow from "@/assets/left_arrow.png";
import RightArrow from "@/assets/right_arrow.png";
import {useRoute, useRouter} from "vue-router";
import {useNamazStore} from "@/stores/namazStore";
import router from "@/router";

const route = useRoute();

const dateParam = route.params.date.toString();
console.log(dateParam)

watch(() => route.params.date.toString(), async (newRoute) => {
  console.log(newRoute)
  if (!userStore.user!.masjidId) {
    console.log("does not exist")
    return;
  }
  if (namazStore.getNamaz(newRoute)) {
    return;
  }
  namazStore.isLoading = true;
  console.log("does exist")
  const todaysDate = new Date().toISOString().substring(0, 10);
  namazStore.setNamaz(await (
      await axios(`${BASE_URL}/namaz/user/${userStore.user!.masjidId}/date/${newRoute}`)
  ).data.data);

  date.value = new Date(newRoute).toUTCString().slice(0, -12)
  console.log(namazStore.namaz)
  console.log(namazStore.getNamaz(dateParam))
  createNamazTableFromData(newRoute);

  console.log(currentNamaz.value);

  namazStore.isLoading = false;
});

const date = ref(new Date(dateParam).toUTCString().slice(0, -12))


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
const namazStore = useNamazStore();

const masjidData = userStore.user!.id


//get time difference between two dates in seconds
function getDifferenceBetweenTwoTimes(
    date: string,
    namazTime: string,
    currentTime: string
) {


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
    time: string | undefined,
    fajr_azan: string | undefined,
    fajr_jamat: string | undefined,
    zuhr_azan: string | undefined,
    zuhr_jamat: string | undefined,
    asr_azan: string | undefined,
    asr_jamat: string | undefined,
    maghrib_azan: string | undefined,
    maghrib_jamat: string | undefined,
    isha_azan: string | undefined,
    isha_jamat: string | undefined,
    namaz: string | undefined
) {
  if (time! >= fajr_azan! && time! < fajr_jamat!) {
    namaz = "Fajr";
  } else if (time! >= fajr_jamat! && time! < zuhr_jamat!) {
    namaz = "Zuhr";
  } else if (time! >= zuhr_jamat! && time! < asr_jamat!) {
    namaz = "Asr";
  } else if (time! >= asr_jamat! && time! < maghrib_jamat!) {
    namaz = "Maghrib";
  } else {
    namaz = "Isha";
  }

  return namaz;
}

function createNamazTableFromData(todaysDate: string) {
  currentNamaz.value = getNextNamazAccordingToTime(
      currentTime.value,
      namazStore.getNamaz(dateParam)?.fajr_namaz,
      namazStore.getNamaz(dateParam)?.fajr_jamat,
      namazStore.getNamaz(dateParam)?.zuhr_namaz,
      namazStore.getNamaz(dateParam)?.zuhr_jamat,
      namazStore.getNamaz(dateParam)?.asr_namaz,
      namazStore.getNamaz(dateParam)?.asr_jamat,
      namazStore.getNamaz(dateParam)?.maghrib_namaz,
      namazStore.getNamaz(dateParam)?.maghrib_jamat,
      namazStore.getNamaz(dateParam)?.isha_namaz,
      namazStore.getNamaz(dateParam)?.isha_jamat,
      currentNamaz.value
  );


  if (currentNamaz.value == "Fajr") {
    nextNamazTime = namazStore.getNamaz(dateParam)?.fajr_namaz.toString();
  } else if (currentNamaz.value == "Zuhr") {
    nextNamazTime = namazStore.getNamaz(dateParam)?.zuhr_namaz.toString()
  } else if (currentNamaz.value == "Asr") {
    nextNamazTime = namazStore.getNamaz(dateParam)?.asr_namaz.toString()
  } else if (currentNamaz.value == "Maghrib") {
    nextNamazTime = namazStore.getNamaz(dateParam)?.maghrib_namaz.toString()
  } else {
    nextNamazTime = namazStore.getNamaz(dateParam)?.isha_namaz.toString()
  }


  timeDifference.value = getDifferenceBetweenTwoTimes(
      todaysDate,
      nextNamazTime!,
      currentTime.value
  );


  todayNamazData = [
    {
      name: "Fajr",
      icon: Sunrise,
      startTime: namazStore.getNamaz(todaysDate.toString())?.fajr_namaz.toString(),
      endTime: namazStore.getNamaz(todaysDate.toString())?.fajr_jamat.toString(),
      condition: currentNamaz.value == "Fajr",
    },
    {
      name: "Zuhr",
      icon: Sunrise,
      startTime: namazStore.getNamaz(todaysDate.toString())?.zuhr_namaz.toString(),
      endTime: namazStore.getNamaz(todaysDate.toString())?.zuhr_jamat.toString(),
      condition: currentNamaz.value == "Zuhr",
    },
    {
      name: "Asr",
      icon: Sunrise,
      startTime: namazStore.getNamaz(todaysDate.toString())?.asr_namaz.toString(),
      endTime: namazStore.getNamaz(todaysDate.toString())?.asr_namaz.toString(),
      condition: currentNamaz.value == "Asr",
    },
    {
      name: "Maghrib",
      icon: Sunset,
      startTime: namazStore.getNamaz(todaysDate.toString())?.maghrib_namaz.toString(),
      endTime: namazStore.getNamaz(todaysDate.toString())?.maghrib_namaz.toString(),
      condition: currentNamaz.value == "Maghrib",
    },
    {
      name: "Isha",
      icon: Sunset,
      startTime: namazStore.getNamaz(todaysDate.toString())?.isha_namaz.toString(),
      endTime: namazStore.getNamaz(todaysDate.toString())?.isha_namaz.toString(),
      condition: currentNamaz.value == "Isha",
    },
  ];

  console.log(todayNamazData)
}

function addOneDay(dateString: string): string {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Add one day (24 hours) to the date
  date.setDate(date.getDate() + 1);

  // Format the date back to a string (YYYY-MM-DD format)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function subtractOneDay(dateString: string): string {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Subtract one day (24 hours) from the date
  date.setDate(date.getDate() - 1);

  // Format the date back to a string (YYYY-MM-DD format)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function goToNextPage() {
  router.push(`/namaz/${addOneDay(dateParam)}`)
}

onMounted(async () => {
  if (!userStore.user!.masjidId) {
    console.log("does not exist")
    return;
  }
  if (namazStore.getNamaz(dateParam)) {
    return;
  }
  namazStore.isLoading = true;
  console.log("does exist")
  const todaysDate = new Date().toISOString().substring(0, 10);
  namazStore.setNamaz(await (
      await axios(`${BASE_URL}/namaz/user/${userStore.user!.masjidId}/date/${dateParam}`)
  ).data.data);

  console.log(namazStore.namaz)
  console.log(namazStore.getNamaz(dateParam))
  createNamazTableFromData(todaysDate);

  console.log(currentNamaz.value);

  namazStore.isLoading = false;
});


// used to make the clock tick in time backwards,
//until it reaches zero and hence a function is triggered,
// to get the current namaz according to the time
if (userStore.user!.masjidId != null) {
  setInterval(() => {
    if (timeDifference.value > 0) {
      timeDifference.value--;
    } else {
      const todaysDate = new Date().toISOString().substring(0, 10);


      currentTime.value = new Date().toLocaleTimeString();
      createNamazTableFromData(todaysDate);
    }
  }, 1000);
}
</script>

<template>
  <template v-if="userStore.user!.masjidId==null">

    <section
    >
      <div
          class="max-w-screen h-[calc(100dvh-80px)]  px-4 text-center md:px-8 flex flex-col justify-center items-center">
        <div class="max-w-xl space-y-3 md:mx-auto">

          <p class="text-gray-800 text-3xl font-semibold sm:text-4xl">
            No Masjids followed
          </p>
          <p class="text-gray-600">
            Follow a masjid to view their timings here
          </p>
          <RouterLink to="/search"
                      class="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
            View masjids
          </RouterLink>
        </div>


      </div>
    </section>
  </template>
  <template v-else>

    <template v-if="namazStore.isLoading">
      <h1>Loading</h1>
    </template>
    <template v-else>
      <div class="mx-3 flex justify-between items-center gap-2">
        <img :src="LeftArrow" alt="left arrow" class="flex-none w-10 h-10">
        <div class="p-4 mx-auto max-w-[800px] text-xl lg:text-2xl">
          <h2 class="font-semibold text-lg text-gray-800">Mumbai, India</h2>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-600 font-medium text-xl">
                Next Namaz: {{ currentNamaz }} in
                {{ secondsToHms(timeDifference) }}
              </p>
            </div>
            <img src="@/assets/mosque.png" alt="" class="flex-none w-20 h-auto">
          </div>

          <div>
            <p class="text-gray-600 mb-3">Date</p>
            <h2 class="text-2xl font-medium">17 Jummada Al-Awwal 1445</h2>
            <h3 class="text-xl text-gray-500 font-medium mb-10">
              {{ date }}
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

        <img :src="RightArrow" alt="right arrow" class="flex-none w-10 h-10" @click="goToNextPage">
      </div>

    </template>
  </template>
</template>
