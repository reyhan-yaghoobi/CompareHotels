<script setup>
import {computed} from "vue";
import {useHotelsStore} from "@/stores/hotels.js";
import {useRouter} from "vue-router";


const store = useHotelsStore()

const router = useRouter()
const formatPrice = (price) => {
  return price.toLocaleString("en-US")
}

const goBack = () => {
  router.push('/')
}

const selectedHotels = computed(() => store.selectedHotels || []);

const priceStats = computed(() => {
  if (selectedHotels.value.length === 0) {
    return {min: null, max: null};
  }

  const prices = selectedHotels.value.map(hotel => hotel.pricePerNight);

  const minPrice = Math.min(...prices);

  return {
    min: minPrice,
  };
});


const ratingStats = computed(() => {
  if (selectedHotels.value.length === 0) {
    return {min: null, max: null};
  }

  const ratings = selectedHotels.value.map(hotel => hotel.rating);

  const maxRating = Math.max(...ratings);

  return {
    max: maxRating,

  };
});


</script>

<template>
  <div class="compare-page">
    <header class="compare-page__header">
      <h1 class="compare-page__title">مقایسه هتل‌ها</h1>

      <button class="compare-page__back-btn" @click="goBack">بازگشت به لیست</button>
    </header>

    <div class="compare-table">


      <div class="compare-table__row compare-table__row--header">
        <div class="compare-table__label">
          مشخصات هتل
        </div>

        <div v-for="hotel in store.selectedHotels"
             :key="hotel.id"
             class="compare-table__col compare-table__col--header">

          <img :src="hotel.image" :alt="hotel.name" class="compare-table__image"/>

          <h3 class="compare-table__hotel-name">{{ hotel.name }}</h3>

          <p class="compare-table__city">{{ hotel.city }}</p>
        </div>
      </div>


      <div class="compare-table__row">
        <div class="compare-table__label">
          قیمت هر شب
        </div>

        <div
            v-for="hotel in store.selectedHotels"
            :key="hotel.id"
            class="compare-table__col">

          <span class="compare-table__price"
                :class="{ 'is-cheapest': hotel.pricePerNight === priceStats.min }">{{
              formatPrice(hotel.pricePerNight)
            }}تومان</span>
        </div>
      </div>


      <div class="compare-table__row">
        <div class="compare-table__label">
          امتیاز کاربران
        </div>

        <div
            v-for="hotel in store.selectedHotels"
            :key="hotel.id"
            class="compare-table__col">
          <span class="compare-table__rating"
                :class="{ 'is-highest-rated': hotel.rating === ratingStats.max }">{{ hotel.rating }}⭐</span>
        </div>
      </div>


      <div class="compare-table__row">
        <div class="compare-table__label">
          تعداد نظرات
        </div>

        <div
            v-for="hotel in store.selectedHotels"
            :key="hotel.id"
            class="compare-table__col">
          <span class="compare-table__reviews">{{ hotel.reviewCount }}</span>
        </div>
      </div>


      <div class="compare-table__row">
        <div class="compare-table__label">
          درجه هتل
        </div>

        <div
            v-for="hotel in store.selectedHotels"
            :key="hotel.id"
            class="compare-table__col">
          <span class="compare-table__stars"> {{ "★".repeat(hotel.stars) }}</span>
        </div>
      </div>


      <div class="compare-table__row">
        <div class="compare-table__label">
          صبحانه
        </div>

        <div
            v-for="hotel in store.selectedHotels"
            :key="hotel.id"
            class="compare-table__col">
          <span class="compare-table__breakfast"
                :class="['compare-table__breakfast-status', hotel.breakfast ? 'is-available' : 'is-unavailable']">
            {{ hotel.breakfast ? 'دارد' : 'ندارد' }}</span>
        </div>
      </div>


      <div class="compare-table__row">
        <div class="compare-table__label">
          لغو رزرو
        </div>

        <div
            v-for="hotel in store.selectedHotels"
            :key="hotel.id"
            class="compare-table__col">
          <span class="compare-table__cancellation">{{ hotel.cancellation ? 'دارد' : 'ندارد' }}</span>
        </div>
      </div>


      <div class="compare-table__row">
        <div class="compare-table__label">
          امکانات
        </div>

        <div
            v-for="hotel in store.selectedHotels"
            :key="hotel.id"
            class="compare-table__col">
          <div class="compare-table__amenities-wrapper">
            <span class="compare-table__amenity" v-for="item in hotel.amenities" :key="item">{{ item }}</span>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

