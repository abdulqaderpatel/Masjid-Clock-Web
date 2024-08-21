import AddNamazView from "@/modules/masjid/AddNamazView.vue";
import HomeView from "@/modules/user/HomeView.vue";
import {createRouter, createWebHistory} from "vue-router";

import authenticationRouter from "@/modules/authentication/routes/authenticationRouter";
import userRouter from "@/modules/user/routes/userRouter";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...authenticationRouter,
        ...userRouter,
        {
            path: "/",
            name: "home",
            component: HomeView,
        },

        {
            path: "/addNamaz",
            name: "addNamaz",
            component: AddNamazView,
        },
    ],
});

export default router;
