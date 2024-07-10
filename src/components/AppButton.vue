<template>
  <button
    @click="$emit('buttonClick')"
    class="bg-primary-500 hover:bg-[#3157c0] px-3 py-2 rounded border-2-b-red-300 text-white"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});

defineEmits(["buttonClick"]);
</script>

<style scoped></style>
