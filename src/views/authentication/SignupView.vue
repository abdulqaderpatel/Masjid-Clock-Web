<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
import AuthInputBox from "@/components/AuthInputBox.vue";
import AuthLabel from "@/components/AuthLabel.vue";
import Modal from "../../components/popup/Modal.vue";
import { Input } from "@/enums/Input";
import { AUTH_TOKEN, BASE_URL } from "@/global";
import axios from "axios";
import { ref } from "vue";
import type ApiResponse from "@/models/ApiResponse";
import router from "@/router";
import { useRouter } from "vue-router";
import VerifyEmail from "./VerifyEmail.vue";
import { jwtDecode } from "jwt-decode";
import type Masjid from "@/models/Masjid";
import { useMasjidStore } from "@/stores/masjidStore";
import AuthUserTypeCard from "@/components/AuthUserTypeCard.vue";
import MasjidFilledIcon from "../../assets/mosque_icon_filled.png";
import MasjidPlainIcon from "../../assets/mosque_icon_plain.png";
import UserFilledIcon from "../../assets/user_icon_filled.png";
import UserPlainIcon from "../../assets/user_icon_plain.png";

let masjidStore = useMasjidStore();

const formData = ref({
  name: "",
  email: "",
  password: "",
  country: "",
  state: "",
  city: "",
  address: "",
});

const userType = ref("user");

console.log(userType.value);

const isButtonLoading = ref(false);
const showModal = ref(false);
const errorMessage = ref("");

function validateForm() {
  if (!formData.value.name) {
    return "Name is required.";
  }
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
  if (!formData.value.country) {
    return "Country is required.";
  }
  if (!formData.value.state) {
    return "State is required.";
  }
  if (!formData.value.city) {
    return "City is required.";
  }
  if (!formData.value.address) {
    return "Address is required.";
  }
  return "";
}

async function signup() {
  isButtonLoading.value = true;
  setTimeout(() => {}, 3000);
  console.log(isButtonLoading.value);

  const error = validateForm();
  if (error) {
    isButtonLoading.value = false;
    errorMessage.value = error;
    showModal.value = true;
    return;
  }

  try {
    const response: ApiResponse<string> = (
      await axios.post(`${BASE_URL}/masjid/register`, formData.value)
    ).data;
    localStorage.setItem("auth-token", response.data);

    const masjidData: Masjid = jwtDecode(
      localStorage.getItem(AUTH_TOKEN) || " "
    );

    masjidStore.setMasjid(masjidData);

    console.log(masjidStore.getMasjidData);

    console.log("timepass");

    console.log(masjidData);

    router.push({ name: "verifyEmail" });
  } catch (e: any) {
    errorMessage.value = "An error occured";
    showModal.value = true;
  } finally {
    isButtonLoading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto p-4 w-max flex flex-col items-center gap-2">
    <h1 class="font-bold text-4xl self-center">Register</h1>
    <p class="text-gray-800 text-base mb-4">Manage your masjid schedule</p>
    <div class="flex w-max justify-between items-center gap-10">
      <div class="hidden md:w-[400px] lg:w[500px] bg-blue-500 lg:flex flex-col">
        <div class="p-4">
          <h1 class="font-bold text-4xl text-center text-white mb-3">
            Masjid Clock
          </h1>
          <p class="text-gray-300 mb-3 text-2xl font-semibold text-center">
            Your masjid Schedule, our responsibility
          </p>
        </div>
        <img
          src="../../assets/masjid_register.jpg"
          width="400px"
          alt="masjid image"
        />
      </div>

      <form
        class="sm:max-w-[500px] grid grid-cols-1 md:grid-cols-2 gap-4"
        @submit.prevent="signup"
      >
        <AuthUserTypeCard
          :is-selected="userType == 'user'"
          :selected-icon="UserFilledIcon"
          :un-selected-icon="UserPlainIcon"
          title="User"
          @click="userType = 'user'"
        />
        <AuthUserTypeCard
          :is-selected="userType == 'mosque'"
          :selected-icon="MasjidFilledIcon"
          :un-selected-icon="MasjidPlainIcon"
          title="Masjid"
          @click="userType = 'mosque'"
        />

        <div class="col-span-2 md:col-span-1">
          <AuthInputBox
            title="Name"
            v-model="formData.name"
            placeholder="Enter Name"
          />
        </div>

        <div class="col-span-2 md:col-span-1">
          <AuthInputBox
            title="Email"
            v-model="formData.email"
            placeholder="Enter Email Address"
            :input-type="Input.EMAIL"
          />
        </div>

        <div class="col-span-2 md:col-span-1">
          <AuthInputBox
            title="Password"
            v-model="formData.password"
            class="mb-4"
            placeholder="Enter Password"
            :input-type="Input.PASSWORD"
          />
        </div>

        <div class="col-span-2 md:col-span-1">
          <AuthLabel title="Country" />
          <country-select
            placeholder="no"
            class="shadow bg-white border-gray-100 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block mb-4 w-full"
            v-model="formData.country"
            country="US"
          />
        </div>

        <div class="col-span-2 md:col-span-1">
          <AuthLabel title="Region" />
          <region-select
            class="shadow bg-white border-gray-100 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block mb-4 w-full"
            v-model="formData.state"
            :country="formData.country"
            :region="formData.state"
          />
        </div>

        <div class="col-span-2 md:col-span-1">
          <AuthInputBox
            title="City"
            class="mb-4"
            v-model="formData.city"
            placeholder="Enter City"
          />
        </div>

        <div class="col-span-2 flex flex-col justify-center align-center">
          <AuthLabel title="Address" />
          <textarea
            type="text"
            v-model="formData.address"
            placeholder="Enter Address"
            rows="4"
            class="shadow border-gray-100 focus:outline-none focus:border-gray-900 border-2 rounded px-2 py-2 placeholder:text-base block mb-8 w-full"
          />
        </div>

        <div class="col-span-2 flex justify-center">
          <AppButton title="Register" :isLoading="isButtonLoading" />
        </div>
      </form>
    </div>
    <Modal
      v-if="showModal"
      :show="showModal"
      title="Error"
      :message="errorMessage"
      @close="showModal = false"
    />
  </div>
</template>

<style scoped></style>
