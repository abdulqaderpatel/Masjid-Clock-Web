<script setup lang="ts">
defineProps({
  isSelected: Boolean,
  selectedIcon: String,
  unSelectedIcon: String,
  title: String,
});

defineEmits(["onCardClick"]);
</script>

<template>
  <div
    class="w-[200px] h-[150px] border-2 border-gray-300 flex flex-col gap-2 justify-center items-center"
    :class="{ 'border-blue-500': isSelected }"
    @click="$emit('onCardClick')"
  >
    <template v-if="isSelected">
      <img :src="selectedIcon" width="75" alt="" />
    </template>
    <template v-else>
      <img :src="unSelectedIcon" width="75" alt="" />
    </template>
    <p class="font-medium" :class="{ 'text-blue-500': isSelected }">
      {{ title }}
    </p>
  </div>
</template>

<style scoped></style>
