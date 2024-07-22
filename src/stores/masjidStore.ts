import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Masjid from '@/models/Masjid'

export const useMasjidStore = defineStore('masjidName', () => {
    let masjid: any;

    const getMasjidData = computed(() => masjid)
    function setMasjid(masjidDetails: Masjid) {
        masjid = masjidDetails;
    }

    return { masjid, getMasjidData, setMasjid }
})


