<template>
  <div class="flex justify-between items-center mb-2 hover:bg-gray-200">
    <div class="flex items-center gap-3">
      <img :src="icon" alt="" width="40" />
      <p class="font-medium text-blue-500" :class="{ 'text-black': isOngoing }">
        {{ name }}
      </p>
    </div>
    <div class="flex items-center gap-3">
      <p
        class="font-semibold text-blue-500"
        :class="{ 'text-black': isOngoing }"
      >
        <template v-if="time">
          <template v-if="time > '11:59'"> {{ time }} p.m </template>
          <template v-else> {{ time }} a.m </template>
        </template>
      </p>
      <img src="../../assets/volume-up.png" alt="" width="40" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  icon: String,
  time: {
    name: String,
    required: true,
  },
  isOngoing: Boolean,
});
</script>

<style scoped></style>
