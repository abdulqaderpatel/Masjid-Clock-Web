<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { AUTH_TOKEN, BASE_URL } from "./global";
import router from "./router";
import axios from "axios";
import { onMounted } from "vue";
import { useMasjidStore } from "./stores/masjidStore";
import type Masjid from "./models/Masjid";
import { jwtDecode } from "jwt-decode";

const masjidStore = useMasjidStore();

const masjidData: Masjid = jwtDecode(localStorage.getItem(AUTH_TOKEN) || " ");
console.log(masjidData);

masjidStore.setMasjid(masjidData);
console.log(masjidStore.getMasjidData());

onMounted(async () => {
  if (!localStorage.getItem(AUTH_TOKEN)) {
    router.push("/signup");
    console.log("timepas");
    return;
  }

  try {
    const data = await axios.get(`${BASE_URL}/masjid/isVerified`, {
      headers: {
        "auth-token": `bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    });
    router.push("/");
  } catch (e) {
    router.push("/verifyEmail");
  }
});
</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
