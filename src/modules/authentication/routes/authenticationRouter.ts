import SignupView from "@/modules/authentication/views/SignupView.vue";
import VerifyEmail from "@/modules/authentication/views/VerifyEmail.vue";
import LoginView from "@/modules/authentication/views/LoginView.vue";

export default [
    {
        path: "/signup",
        name: "signup",
        component: SignupView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/verifyEmail",
        name: "verifyEmail",
        component: VerifyEmail,
    },
];
