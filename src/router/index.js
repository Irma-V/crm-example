import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
// import LoginPage from "../views/LoginPage.vue";
// import CategoriesPage from "../views/CategoriesPage.vue";

import { auth } from "@/main";

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
    meta: { layout: "main", auth: true },
    component: HomePage,
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true },
    component: () => import("../views/CategoriesPage"),
  },
  {
    path: "/detail-record/:id",
    name: "detail-record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/DetailRecord"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true },
    component: () => import("../views/PlanningPage"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: true },
    component: () => import("../views/ProfilePage"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/RecordPage"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true },
    component: () => import("../views/HistoryPage"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
 let currentUser = auth.currentUser
 console.log('Кто? ', currentUser);
 let requireAuth = to.matched.some(record => record.meta.auth)
 console.log('Авторизован? ', requireAuth);


 if (requireAuth && !currentUser) {
    next('/login?message=login')
 } else {
    next()
 }
});

export default router;
