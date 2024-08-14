<template>
  <label for="" class="font-medium w-[200px]">{{ title }} </label>
  <input
      v-model="model"
      :placeholder="placeholder"
      :type="inputType"
      class="shadow border-gray-200 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base w-full"
  />
</template>

<script setup lang="ts">
import {Input} from "@/enums/Input";

const model = defineModel();
defineProps({
  title: String,

  placeholder: String,
  inputType: {
    type: String,
    default: Input.TEXT,
  },
});
</script>

<style scoped></style>
