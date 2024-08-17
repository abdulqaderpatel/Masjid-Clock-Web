// stores/userStore.ts
import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import type User from '@/models/User';

export const useUserStore = defineStore('masjidStore', () => {
    const user = ref<User | null>(null);


    function setUser(masjidData: User) {

        user.value = masjidData;

    }

    const isVerified = computed(() => {
        return user.value?.address != "" && user.value?.address != null;
    })

    return {user, isVerified, setUser,};
});
