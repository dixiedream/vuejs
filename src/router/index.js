import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const { BASE_URL } = import.meta.env;

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
});

export default router;
