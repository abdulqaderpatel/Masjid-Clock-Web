<template>
  <div
    class="flex justify-between items-center mb-2 hover:bg-gray-200 px-2"
    :class="{ 'bg-green-300': isOngoing }"
  >
    <div class="flex items-center gap-3">
      <img :src="icon" alt="" width="40" />
      <p
        class="font-medium text-blue-500"
        :class="{ 'text-red-600': isOngoing }"
      >
        {{ name }}
      </p>
    </div>
    <div class="flex items-center gap-3">
      <p
        class="font-semibold text-blue-500"
        :class="{ 'text-red-600': isOngoing }"
      >
        <template v-if="time">
          <template v-if="time > '11:59'">
            {{ time.substring(0, 5) }} p.m
          </template>
          <template v-else> {{ time.substring(0, 5) }} a.m </template>
        </template>
      </p>
      <!-- <img src="../../assets/volume-up.png" alt="" width="40" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  icon: String,
  time: {
    name: String,
    required: true,
  },
  isOngoing: Boolean,
});

console.log(props.isOngoing);
</script>

<style scoped></style>
