<template>
  <div class="flex justify-between items-center mb-2 hover:bg-gray-200">
    <div class="flex items-center gap-3">
      <img :src="namaz?.icon" alt="" width="40" />
      <p class="font-medium text-blue-500">{{ namaz?.name }}</p>
    </div>
    <div class="flex items-center gap-3">
      <p class="font-semibold text-blue-500">{{ namaz?.time }}</p>
      <img src="../../assets/volume-up.png" alt="" width="40" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Namaz from "@/models/Namaz";

defineProps({
  namaz: Object as () => Namaz,
});
</script>

<style scoped></style>
