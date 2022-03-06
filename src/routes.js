import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachRegister from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestsReceived from "./pages/requests/RequestsReceived.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";

import store from "./store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { name: "coaches", path: "/coaches", component: CoachesList },
    {
      name: "coach-detail",
      path: "/coaches/:id",
      component: CoachDetails,
      props: true,
      children: [
        { name: "contact-coach", path: "contact", component: ContactCoach },
      ],
    },
    {
      name: "register-coach",
      path: "/register",
      component: CoachRegister,
      meta: { requiresAuth: true },
    },
    {
      name: "requests",
      path: "/requests",
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    {
      name: "auth",
      path: "/auth",
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    { name: "not-found", path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isUserAuthenticated) {
    next("/auth");
  }

  if (to.meta.requiresUnauth && store.getters.isUserAuthenticated) {
    next("/coaches");
  }

  next();
});

export default router;
