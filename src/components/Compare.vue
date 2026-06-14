<script setup>
import {useHotelsStore} from "@/stores/hotels.js";
import router from "@/router/index.js";

const store = useHotelsStore()

const goToCompare=()=>{
  router.push("/compare")
}
</script>

<template>
  <div class="compare-bar">
    <div class="compare-bar__container">
      <div class="compare-bar__list">
        <span class="compare-bar__count">{{ store.selectedCount }} انتخابی</span>
        <div class="compare-bar__item" v-for="hotel in store.selectedHotels" :key="hotel.id">
          <img class="compare-bar__img" :src="hotel.image" :alt="hotel.name">

          <button class="compare-bar__remove" @click="store.toggleSelectHotel(hotel)">×</button>
        </div>
      </div>

      <div class="compare-bar__actions">
        <button class="compare-bar__btn-clear" @click="store.selectedHotels = []" >پاک کردن</button>

        <button  @click="goToCompare"  class="compare-bar__btn-compare" :disabled="!store.isCompare"> مقایسه کن</button>
      </div>
    </div>
  </div>
</template>

