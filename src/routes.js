import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachRegister from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestsReceived from "./pages/requests/RequestsReceived.vue";
import NotFound from "./pages/NotFound.vue";

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
    { name: "register-coach", path: "/register", component: CoachRegister },
    { name: "requests", path: "/requests", component: RequestsReceived },
    { name: "not-found", path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
