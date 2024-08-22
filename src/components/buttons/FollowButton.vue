<script setup lang='ts'>
import {computed} from "vue";

const props = defineProps({
  title: String,
  color: String
})

defineEmits(['followButtonClick'])

const bgColor = computed(() => `bg-${props.color}-500`);

</script>

<template>
  <button class='hover:bg-red-900 px-3 py-1 rounded border-2-b-red-300 text-white' :class='bgColor'
          @click="$emit('followButtonClick')">{{ title }}
  </button>
</template>

<style scoped></style>
