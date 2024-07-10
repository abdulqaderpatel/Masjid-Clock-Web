<template>
  <input
    type="text"
    :v-model="variable"
    :placeholder="placeholder"
    class="shadow border-gray-400 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block"
  />
</template>

<script setup lang="ts">
defineProps({ variable: String, placeholder: String });
</script>

<style scoped></style>
