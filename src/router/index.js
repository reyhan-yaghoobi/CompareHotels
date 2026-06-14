import {createRouter, createWebHistory} from "vue-router";

import HotelList from "@/components/HotelList.vue";
import ComparePage from "@/components/ComparePage.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HotelList
    },
    {
        name: 'compare',
        path: "/compare",
        component: ComparePage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;