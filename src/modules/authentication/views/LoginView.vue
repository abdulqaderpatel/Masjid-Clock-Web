<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
import AuthInputBox from "@/components/AuthInputBox.vue";
import Modal from "@/components/popup/Modal.vue";
import {Input} from "@/enums/Input";
import {AUTH_TOKEN, BASE_URL} from "@/global";
import axios from "axios";
import {ref} from "vue";
import type ApiResponse from "@/models/ApiResponse";
import router from "@/router";
import {jwtDecode} from "jwt-decode";
import type User from "@/models/User";
import {useUserStore} from "@/stores/userStore";
import {UserType} from "@/enums/UserType";


let userStore = useUserStore();

const formData = ref({
  email: "",
  password: "",
});

const userType = ref("user");

console.log(userType.value);

const isButtonLoading = ref(false);
const showModal = ref(false);
const errorMessage = ref("");

function validateForm() {

  if (!formData.value.email) {
    return "Email is required.";
  }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(formData.value.email)) {
    return "The Email entered is not valid.";
  }
  if (!formData.value.password) {
    return "Password is required.";
  }
  return "";
}


async function login() {
  isButtonLoading.value = true;

  const error = validateForm();
  if (error) {
    isButtonLoading.value = false;
    errorMessage.value = error;
    showModal.value = true;
    return;
  }

  try {
    const response: ApiResponse<string> = (
        await axios.post(`${BASE_URL}/masjid/login`, formData.value)
    ).data;
    localStorage.setItem("auth-token", response.data);

    const masjidData: User = jwtDecode(
        localStorage.getItem(AUTH_TOKEN) || " "
    );

    if (masjidData.masjidId) {
      masjidData.type = UserType.USER;
      localStorage.setItem("type", UserType.USER);
    } else {
      masjidData.type = UserType.MASJID
      localStorage.setItem("type", UserType.MASJID);
    }

    userStore.setUser(masjidData);

    await router.push({name: "home"});
  } catch (e: any) {
    errorMessage.value = "An error occured";
    showModal.value = true;
  } finally {
    isButtonLoading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto p-4 w-max flex flex-col justify-center items-center gap-2 h-[100dvh]">
    <div class="justify-self-end">

      <h1 class="font-bold text-4xl justify-self-start">Login</h1>
      <p class="text-gray-800 text-base mb-4">Enter your credentials</p>
    </div>


    <form
        class="max-w-[400px] flex flex-col items-start gap-4"
        @submit.prevent="login"
    >


      <AuthInputBox
          title="Email"
          v-model="formData.email"
          placeholder="Enter Email Address"
          :input-type="Input.EMAIL"
      />


      <AuthInputBox
          title="Password"
          v-model="formData.password"
          class="mb-4"
          placeholder="Enter Password"
          :input-type="Input.PASSWORD"
      />


      <AppButton title="Login" :isLoading="isButtonLoading" class="mt-5 place-self-center"/>


      <p class="col-span-2 text-center">Don't have an account?
        <span>    <RouterLink to="/signup" class="text-blue-800">Register </RouterLink>
        </span>
      </p>


    </form>

    <Modal
        :show="showModal"
        title="Error"
        :message="errorMessage"
        @close="showModal = false"
    />
  </div>
</template>

<style scoped></style>
