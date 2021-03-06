export default {
  namespaced: true,
  state() {
    return {
      lastFetchTimestamp: null,
      coaches: [
        {
          id: "c1",
          firstName: "Maximilian",
          lastName: "Schwarzmüller",
          areas: ["frontend", "backend", "career"],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: "c2",
          firstName: "Julie",
          lastName: "Jones",
          areas: ["frontend", "career"],
          description:
            "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations: {
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setFetchTimestamp(state) {
      state.lastFetchTimestamp = new Date().getTime();
    },
  },
  actions: {
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) return;

      const response = await fetch(
        `https://find-a-coach-u03c9-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
      );
      if (!response.ok) {
        const error = new Error(
          response.message || "Failed to fetch data from the backend!"
        );
        throw error;
      }
      const responseData = await response.json();

      const coaches = [];
      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        coaches.push(coach);
      }

      context.commit("setCoaches", coaches);
      context.commit("setFetchTimestamp");
    },
    async registerCoach(context, payload) {
      const userId = context.rootGetters.userId;
      const coachData = {
        id: context.rootGetters.userId,
        firstName: payload.first,
        lastName: payload.last,
        description: payload.desc,
        hourlyRate: payload.rate,
        areas: payload.areas,
      };

      const token = context.rootGetters.userToken;

      const response = await fetch(
        `https://find-a-coach-u03c9-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
        {
          method: "PUT",
          body: JSON.stringify(coachData),
        }
      );

      if (!response.ok) {
        // error to handle later
      }

      // const responseData = await response.json();

      context.commit("registerCoach", {
        ...coachData,
        id: userId,
      });
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(state, getters, rootState, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some((coach) => coach.id === userId);
    },
    shouldUpdate(state) {
      const lastFetchTimestamp = state.lastFetchTimestamp;
      if (!lastFetchTimestamp) return true;

      const currentTimestamp = new Date().getTime();
      if ((currentTimestamp - lastFetchTimestamp) / 1000 > 60) return true;

      return false;
    },
  },
};
