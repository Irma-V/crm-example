import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
// import LoginPage from "../views/LoginPage.vue";
// import CategoriesPage from "../views/CategoriesPage.vue";

const routes = [
  //empty-layout
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("../views/LoginPage"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("../views/RegisterPage"),
  },
  {
    path: "/userAgreementPage",
    name: "userAgreementPage",
    meta: { layout: "empty" },
    component: () => import("../views/UserAgreementPage"),
  },
  //main-layout
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: HomePage,
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main" },
    component: () => import("../views/CategoriesPage"),
  },
  {
    path: "/detail-record",
    name: "detail-record",
    meta: { layout: "main" },
    component: () => import("../views/DetailRecord"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main" },
    component: () => import("../views/PlanningPage"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main" },
    component: () => import("../views/ProfilePage"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main" },
    component: () => import("../views/RecordPage"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main" },
    component: () => import("../views/HistoryPage"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
