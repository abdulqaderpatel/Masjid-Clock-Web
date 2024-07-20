<template>
    <div v-if="show" class="modal-overlay">
        <div class="bg-white w-[200px]">
            <div class="h-5 flex justify-center items-center p-4 pt-5 border">
                <h3 class="font-bold">{{ title }}</h3>
            </div>
            <div class="p-4 flex flex-col items-center border-black">
                <p class="mb-2">{{ message }}</p>
                <!-- <ModalButton title="Close" onclick="$emit('close')" /> -->

                <ModalButton title="Close" @click="$emit('close')" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ModalButton from '../buttons/ModalButton.vue';

defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});
defineEmits(["close"]);
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
