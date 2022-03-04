import { createStore } from "vuex";

import coachesModule from "./modules/coaches";

export default createStore({
  modules: {
    coaches: coachesModule,
  },
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {},
});
