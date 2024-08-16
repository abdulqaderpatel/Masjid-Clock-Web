// stores/masjidStore.ts
import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import type Masjid from '@/models/Masjid';

export const useMasjidStore = defineStore('masjidStore', () => {
    const masjid = ref<Masjid | null>(null);


    function setMasjid(masjidData: Masjid) {

        masjid.value = masjidData;
        
    }

    const isVerified = computed(() => {
        return masjid.value?.address != "";
    })

    return {masjid, isVerified, setMasjid,};
});
