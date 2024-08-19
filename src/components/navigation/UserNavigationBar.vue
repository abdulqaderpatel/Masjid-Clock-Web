<template>
  <nav class="bg-white border-b fixed top-0 left-0 w-full z-30">
    <div class="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
      <div class="flex-none lg:flex-initial">
        <a>
          <img src="https://www.floatui.com/logo.svg" width="120" height="50" alt="Float UI logo"/>
        </a>
      </div>
      <div class="flex-1 flex items-center justify-between">
        <div
            :class="['bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none', { 'hidden': !menuState }]">
          <ul class="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
            <li class="text-gray-600 hover:text-gray-900">

              <RouterLink to="item.path">{{ }}</RouterLink>

            </li>

          </ul>

        </div>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import AppSearchBar from "@/components/AppSearchBar.vue";

// State variables
const menuState = ref(false);

// Navigation items
const navigation = [
  {title: "Home", path: "javascript:void"},
  {title: "Ramadan", path: "javascript:void(0)"},
  {title: "Settings", path: "javascript:void(0)"},
];

// Methods
const toggleMenu = () => {
  menuState.value = !menuState.value;
};
</script>

<style scoped>
/* Add additional styles here if needed */
</style>
