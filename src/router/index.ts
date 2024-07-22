import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/User/HomeView.vue";
import SignupView from "@/views/authentication/SignupView.vue";
import VerifyEmail from "@/views/authentication/VerifyEmail.vue";
import AddNamazView from "@/views/Masjid/AddNamazView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/verifyEmail",
      name: "verifyEmail",
      component: VerifyEmail
    },
    {
      path: "/addNamaz",
      name: "addNamaz",
      component: AddNamazView
    }
  ],
});

export default router;
