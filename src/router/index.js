import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SinglePageView from "../views/SinglePageView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/movie/:title",
    name: "movie",
    component: SinglePageView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
