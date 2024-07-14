<template>
  <input
    v-model="model"
    :placeholder="placeholder"
    :type="inputType"
    class="shadow border-gray-400 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block"
  />
</template>

<script setup lang="ts">
import { Input } from "@/enums/Input";

const model = defineModel();
defineProps({
  variable: String,
  placeholder: String,
  inputType: {
    type: String,
    default: Input.TEXT,
  },
});
</script>

<style scoped></style>
