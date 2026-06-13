<script setup>
import hotels from "../data/hotels.json"
import HotelCard from "./HotelCard.vue";
import Compare from "@/components/Compare.vue";

const props = defineProps({
  hotels: Object
})
</script>

<template>
  <div class="hotel-list">
    <HotelCard v-for="hotel in hotels"
               :key="hotel.id" :hotel="hotel"/>
  </div>
</template>