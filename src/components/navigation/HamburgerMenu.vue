<template>
  <div>

    <button
        class="p-2 text-gray-700 focus:outline-none"
        @click="toggleMenu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="menuIconPath"/>
      </svg>
    </button>


    <div
        :class="['absolute right-0 top-14 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg', { 'hidden': !menuOpen }]"
    >
      <button class="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100" @click="logout">
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';

// State to manage menu visibility
const menuOpen = ref(false);

// Toggle the menu visibility
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Logout function placeholder
const logout = () => {
  alert('Logout clicked!');
};

// SVG path data for hamburger and close icon
const menuIconPath = ref('M4 6h16M4 12h16m-7 6h7'); // Hamburger icon path

// Toggle icon path for open/close state
watch(() => menuOpen.value, (newVal) => {
  menuIconPath.value = newVal ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'; // Close icon path when open
});
</script>

<style scoped>
/* Ensure the dropdown is positioned correctly */
.hidden {
  display: none;
}
</style>
