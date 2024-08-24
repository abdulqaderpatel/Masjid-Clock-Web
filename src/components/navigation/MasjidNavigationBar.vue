<script setup lang="ts">
import {ref} from 'vue';
import {useRoute, RouterView} from "vue-router";
import AppLogo from '@/assets/app_logo.png';
import HamburgerMenu from "@/components/navigation/HamburgerMenu.vue";

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
            <li v-for="link in navigation" class="text-gray-600 hover:text-indigo-600">
              <RouterLink :to="link.path" :class="{'text-blue-800':useRoute().path == link.path}">
                {{ link.title }}
              </RouterLink>
            </li>
          </ul>
        </div>

      </div>
      <HamburgerMenu/>

    </div>

  </nav>


</template>
