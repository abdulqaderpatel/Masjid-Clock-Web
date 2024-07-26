<template>
  <tr
    class="hover:bg-gray-200 h-[50px] px-4 py-2"
    v-bind:class="{ 'bg-green-300': isOngoing, 'bg-blue-100': !isOngoing }"
  >
    <td class="w-[200px] p-4">
      <!-- <img :src="icon" alt="" width="40" /> -->
      <p
        class="font-medium text-blue-500"
        :class="{ 'text-red-600': isOngoing }"
      >
        {{ name }}
      </p>
    </td>
    <td class="w-[200px] p-4">
      <p
        class="font-semibold text-blue-500"
        :class="{ 'text-red-600': isOngoing }"
      >
        <template v-if="startTime">
          <template v-if="startTime > '11:59'">
            {{ convertTo12HourFormat(startTime) }}
            p.m
          </template>
          <template v-else> {{ startTime.substring(0, 5) }} a.m </template>
        </template>
      </p>
    </td>
    <td class="p-4">
      <p
        class="font-semibold text-blue-500"
        :class="{ 'text-red-600': isOngoing }"
      >
        <template v-if="endTime">
          <template v-if="endTime > '11:59'">
            {{ convertTo12HourFormat(endTime) }}
            p.m
          </template>
          <template v-else> {{ endTime.substring(0, 5) }} a.m </template>
        </template>
      </p>
    </td>
  </tr>
</template>

<script setup lang="ts">
function convertTo12HourFormat(time24: string) {
  let [hours, minutes, seconds] = time24.split(":").map(Number);

  if (hours >= 12) {
    if (hours > 12) {
      hours -= 12;
    }
  } else if (hours === 0) {
    hours = 12;
  }

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
  return formattedTime;
}
defineProps({
  name: String,
  icon: String,
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isOngoing: Boolean,
});
</script>

<style scoped></style>
