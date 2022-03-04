import { createRouter, createWebHistory } from "vue-router";

import CoachesListVue from "./pages/coaches/CoachesList.vue";
import CoachDetailVue from "./pages/coaches/CoachDetail.vue";
import CoachRegisterVue from "./pages/coaches/CoachRegister.vue";
import ContactCoachVue from "./pages/requests/ContactCoach.vue";
import RequestsReceivedVue from "./pages/requests/RequestsReceived.vue";
import NotFoundVue from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { name: "coaches", path: "/coaches", component: CoachesListVue },
    {
      name: "coach-detail",
      path: "/coaches/:id",
      component: CoachDetailVue,
      children: [{ name: "", path: "contact", component: ContactCoachVue }],
    },
    { name: "register-coach", path: "/register", component: CoachRegisterVue },
    { name: "requests", path: "/requests", component: RequestsReceivedVue },
    { name: "not-found", path: "/:notFound(.*)", component: NotFoundVue },
  ],
});

export default router;
