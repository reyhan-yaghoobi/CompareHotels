<script setup>

import {computed} from "vue";
import {useHotelsStore} from "@/stores/hotels.js";


const store = useHotelsStore()

const handlerClick = () => {
  store.toggleSelectHotel(props.hotel)
}

const formatPrice = (price) => {
  return price.toLocaleString("en-US")
}

const isDisable = computed(() => store.selectedCount >= 3 && !store.isSelected(props.hotel.id))

const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="hotel-card"
       :class="{
    'hotel-card--selected': store.isSelected(hotel.id),
    'hotel-card--disabled' : isDisable
    }">
    <div class="hotel-card__image">
      <img class="hotel__image" :src="hotel.image" :alt="hotel.name"/>

      <p class="hotel__stars">{{ hotel.stars }}</p>
    </div>

    <div class="hotel-card__content">
      <div class="info">
        <h2 class="hotel__name">{{ hotel.name }}</h2>

        <p class="hotel__city">{{ hotel.city }}</p>
      </div>

      <div class="hotel-card__rating-box">
        <p class="hotel__rating">{{ hotel.rating }}</p>

        <p class="hotel__comment">{{ hotel.reviewCount }}</p>
      </div>

      <div class="hotel-card__amenities">
        <span class="hotel__amenity" v-for="item in hotel.amenities" :key="item">{{ item }}</span>
      </div>

      <div class="hotel-card__footer">


        <div>
          <p class="hotel__price-label">هر شب از</p>

          <div class="price-box">
            <p class="hotel__price">{{ formatPrice(hotel.pricePerNight) }}</p>

            <p class="hotel__Unit">تومان</p>
          </div>
        </div>
        <button @click="handlerClick"
                class="hotel__compare-btn" :disabled="isDisable">
          {{ store.isSelected(props.hotel.id) ? 'حذف' : 'مقایسه' }}
        </button>
      </div>
    </div>
  </div>
</template>