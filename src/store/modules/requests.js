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
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async contactCoach(context, payload) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message,
      };

      const response = await fetch(
        `https://find-a-coach-u03c9-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
        {
          method: "POST",
          body: JSON.stringify(newRequest),
        }
      );

      if (!response.ok) {
        throw new Error(response.message || "Could not send request.");
      }

      const responseData = await response.json();
      newRequest.id = responseData.name;
      newRequest.coachId = payload.coachId;

      context.commit("addRequest", newRequest);
    },
    async fetchRequests(context) {
      const coachId = context.rootGetters.userId;
      const response = await fetch(
        `https://find-a-coach-u03c9-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`
      );
      if (!response.ok) {
        throw new Error(response.message || "Could not fetch requests.");
      }
      const responseData = await response.json();

      const requests = [];
      for (const key in responseData) {
        const request = {
          id: key,
          coachId: coachId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message,
        };
        requests.push(request);
      }

      context.commit("setRequests", requests);
    },
  },
};
