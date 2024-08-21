import SignupView from "@/modules/authentication/views/SignupView.vue";
import VerifyEmail from "@/modules/authentication/views/VerifyEmail.vue";
import LoginView from "@/modules/authentication/views/LoginView.vue";
import RamadanView from "@/modules/user/views/RamadanView.vue";
import SettingsView from "@/modules/user/views/SettingsView.vue";

export default [
    {
        path: "/ramadan",
        name: "ramadan",
        component: RamadanView,
    },
    {
        path: "/settings",
        name: "settings",
        component: SettingsView,
    },

];
