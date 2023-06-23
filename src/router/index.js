import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
// import LoginPage from "../views/LoginPage.vue";
// import CategoriesPage from "../views/CategoriesPage.vue";

import { auth } from "@/main";
import { onAuthStateChanged } from "firebase/auth";

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
    meta: { 
        layout: "main",
        auth: true,
    },
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

function getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe()
          resolve(user)
        },
        reject
      )
    })
  }

router.beforeEach(async (to) => {
    if (await getCurrentUser() && to.name === 'login') {
        return '/'
    }

    const requiresAuth = to.matched.some((record) => record.meta.auth)
    if (requiresAuth && !(await getCurrentUser())) {
        return '/login'
    }
});

export default router;
