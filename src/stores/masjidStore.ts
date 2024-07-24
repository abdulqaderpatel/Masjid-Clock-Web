import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Masjid from '@/models/Masjid'

export const useMasjidStore = defineStore('masjidName', () => {

    let masjid: Masjid;


    function getMasjidData(): Masjid {
        return masjid;
    }
    function setMasjid(masjidDetails: Masjid) {
        masjid = masjidDetails;
    }

    return { getMasjidData, setMasjid }
})


