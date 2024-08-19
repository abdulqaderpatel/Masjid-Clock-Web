<script setup lang="ts">
import {ref} from "vue";

const menuState = ref(false);
const toggleMenu = () => {
  menuState.value = !menuState.value;
};
</script>

<template>
  <div class="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
    <form class="flex items-center space-x-2 border rounded-md p-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-none text-gray-300" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input class="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto" type="text"
             placeholder="Search"/>
    </form>
    <button class="outline-none text-gray-400 block lg:hidden" @click="toggleMenu">
      <svg v-if="menuState" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>

</style>
