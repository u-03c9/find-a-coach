import { createStore } from "vuex";

import coachesModule from "./modules/coaches";
import requestsModule from "./modules/requests";
import authModule from "./modules/auth";

export default createStore({
  modules: {
    requests: requestsModule,
    coaches: coachesModule,
    auth: authModule,
  },
});
