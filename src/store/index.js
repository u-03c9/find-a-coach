import { createStore } from "vuex";

import coachesModule from "./modules/coaches";
import requestsModule from "./modules/requests";

export default createStore({
  modules: {
    requests: requestsModule,
    coaches: coachesModule,
  },
  state() {
    return {
      userId: "c3",
    };
  },
  mutations: {},
  actions: {},
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});
