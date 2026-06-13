import {defineStore} from 'pinia'
import {ref, computed} from "vue";

export const useHotelsStore = defineStore('hotels', function () {
    const selectedHotels = ref([])

    const selectedCount = computed(() => selectedHotels.value.length);

    const isMax = computed(() => selectedCount.value >= 3)

    const isCompare = computed(() => selectedCount.value >= 2)

    const isSelected = (hotelId) => selectedHotels.value.some(hotel => hotel.id === hotelId)

    const toggleSelectHotel = function (hotel) {
        const alreadySelect = isSelected(hotel.id)

        if (alreadySelect) {
            selectedHotels.value = selectedHotels.value.filter(item => item.id !== hotel.id)
        } else {
            if (!isMax.value) {
                selectedHotels.value.push(hotel)
            }
        }
        console.log(`selectedCount:${selectedCount.value}`)
        console.log(selectedHotels.value)
    }

    return {
        selectedHotels,
        selectedCount,
        isMax,
        isCompare,
        isSelected,
        toggleSelectHotel
    }
})