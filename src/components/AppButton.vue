<template>
  <button type="submit" @click="$emit('buttonClick')"
    class="bg-primary-500 hover:bg-[#3157c0] px-3 py-2 rounded border-2-b-red-300 text-white flex justify-center items-center h-10">
    <template v-if="isLoading" class="flex justify-center items-center">
      <span class="spinner-border border-t-transparent animate-spin inline-block w-4 h-4 border-2 rounded-full"
        role="status" :disabled="isLoading">
      </span>
    </template>
    <template v-else>

      {{ title }}
    </template>
  </button>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  isLoading: Boolean
});

defineEmits(["buttonClick"]);
</script>

<style scoped></style>
