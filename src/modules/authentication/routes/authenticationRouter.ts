import SignupView from "@/modules/authentication/views/SignupView.vue";
import VerifyEmail from "@/modules/authentication/views/VerifyEmail.vue";

export default [
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/verifyEmail",
    name: "verifyEmail",
    component: VerifyEmail,
  },
];
