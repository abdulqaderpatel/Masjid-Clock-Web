<template>
  <tr
    class="flex justify-between items-center mb-2 hover:bg-gray-200 px-2"
    v-bind:class="{ 'bg-green-300': isOngoing, 'bg-blue-100': !isOngoing }"
  >
    <td>
      <img :src="icon" alt="" width="40" />
      <p
        class="font-medium text-blue-500"
        :class="{ 'text-red-600': isOngoing }"
      >
        {{ name }}
      </p>
    </td>
    <td>
      <p
        class="font-semibold text-blue-500"
        :class="{ 'text-red-600': isOngoing }"
      >
        <template v-if="time">
          <template v-if="time > '11:59'">
            {{ convertTo12HourFormat(time) }}
            p.m
          </template>
          <template v-else> {{ time.substring(0, 5) }} a.m </template>
        </template>
      </p>
    </td>
    <td>
      <p
        class="font-semibold text-blue-500"
        :class="{ 'text-red-600': isOngoing }"
      >
        <template v-if="time">
          <template v-if="time > '11:59'">
            {{ convertTo12HourFormat(time) }}
            p.m
          </template>
          <template v-else> {{ time.substring(0, 5) }} a.m </template>
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
  time: {
    type: String,
    required: true,
  },
  isOngoing: Boolean,
});
</script>

<style scoped></style>
