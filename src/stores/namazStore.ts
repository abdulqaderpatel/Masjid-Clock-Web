import {defineStore} from "pinia";
import {ref} from "vue";
import type Namaz from "@/models/Namaz";


export const useNamazStore = defineStore('namazStore', () => {

    const namaz = ref<Namaz[]>([]);

    const isLoading = ref(false);

    function setNamaz(newNamaz: Namaz) {
        namaz.value.push(newNamaz);
    }

    function getNamaz(date: string): Namaz | undefined {
        let dateNamaz: Namaz | undefined = undefined;
        namaz.value.forEach((currentNamaz, index) => {
            if (currentNamaz.date.substring(0, 10) === date) {
                dateNamaz = currentNamaz;
            }
        })

        return dateNamaz;

    }

    return {namaz, setNamaz, getNamaz, isLoading};
})


