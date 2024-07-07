<script setup lang="ts">
import NamazCard from "@/components/namaz/NamazCard.vue";
import { namazData } from "@/data/namaz_data";
</script>

<template>
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
      <template v-for="namaz in namazData"
        ><NamazCard :namaz="namaz"
      /></template>
    </div>
  </div>
</template>
