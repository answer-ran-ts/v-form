import { createRouter, createWebHistory } from "vue-router";
import { asyncRoutes, constantRoutes } from "@/router/modules/constantRouter";

const routes = [...asyncRoutes, ...constantRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
