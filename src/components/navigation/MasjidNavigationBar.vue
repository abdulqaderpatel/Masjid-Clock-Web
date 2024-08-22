<script setup lang="ts">
import {ref} from 'vue';
import {useRoute, RouterView} from "vue-router";
import AppLogo from '@/assets/app_logo.png';

const menuState = ref(false);

const navigation = [
  {title: "Home", path: "/"},

  {title: "Settings", path: "/settings"},
];

const toggleMenu = () => {
  menuState.value = !menuState.value;
};
</script>

<template>
  <nav class="fixed top-0 left-0 bg-white w-full border-b z-50" style="height: 80px;">
    <div class="flex items-center space-x-8 h-full px-4 max-w-screen-xl mx-auto md:px-8">
      <div class="flex-none lg:flex-initial">
        <a>
          <img :src="AppLogo" width="50" alt="Float UI logo"/>
        </a>
      </div>
      <div class="flex-1 flex items-center justify-between">
        <div
            :class="['bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none', { 'hidden': !menuState }]">
          <ul class="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
            <li v-for="link in navigation" :key="link.id" class="text-gray-600 hover:text-indigo-600">
              <RouterLink :to="link.path" :class="{'text-blue-800':useRoute().path == link.path}">
                {{ link.title }}
              </RouterLink>
            </li>
          </ul>
        </div>

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
      </div>
    </div>
  </nav>


</template>
