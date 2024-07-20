<script setup lang='ts'>
defineProps({
    title: String,

})

defineEmits(['modalButtonClick'])
</script>

<template>
    <button class='hover:bg-red-900 px-3 py-1 rounded border-2-b-red-300 text-white bg-red-500'
        @click="$emit('modalButtonClick')">{{ title }}</button>
</template>

<style scoped></style>