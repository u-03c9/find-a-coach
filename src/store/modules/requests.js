export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  getters: {
    requests(state, _getters, _rootState, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasRequests(_state, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
  },
  actions: {
    contactCoach(context, payload) {
      const newRequest = {
        id: new Date().toISOString,
        coachId: payload.coachId,
        userEmail: payload.email,
        message: payload.message,
      };
      context.commit("addRequest", newRequest);
    },
  },
};
