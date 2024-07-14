// @ts-nocheck

import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import vueCountryRegionSelect from "vue3-country-region-select";

const app = createApp(App);
app.use(vueCountryRegionSelect);

app.use(createPinia());
app.use(router);

app.mount("#app");
