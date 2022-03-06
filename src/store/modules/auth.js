import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpAx9GLElvW3v1MGOoJNS7v8Z4J6kPjEI",
  authDomain: "find-a-coach-u03c9.firebaseapp.com",
  databaseURL:
    "https://find-a-coach-u03c9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "find-a-coach-u03c9",
  storageBucket: "find-a-coach-u03c9.appspot.com",
  messagingSenderId: "269772450276",
  appId: "1:269772450276:web:8799230d8479f0dc4fbff1",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();

let logoutTimer;

export default {
  state() {
    return {
      firebaseApp: firebaseApp,
      auth: auth,
      userId: null,
      userToken: null,
      tokenExpireDate: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    userToken(state) {
      return state.userToken;
    },
    isUserAuthenticated(state) {
      return !!state.userToken;
    },
  },
  mutations: {
    setUser(state, payload) {
      localStorage.setItem("userId", payload.userId);
      localStorage.setItem("userToken", payload.userToken);
      localStorage.setItem("tokenExpireDate", payload.tokenExpireDate);

      state.userId = payload.userId;
      state.userToken = payload.userToken;
      state.tokenExpireDate = payload.tokenExpireDate;
    },
    logout(state) {
      console.log("mutation/logout");
      clearTimeout(logoutTimer);
      state.auth.signOut();

      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
      localStorage.removeItem("tokenExpireDate");

      state.userId = null;
      state.userToken = null;
      state.tokenExpireDate = null;
    },
  },
  actions: {
    tryLogin(context) {
      const userId = localStorage.getItem("userId");
      const userToken = localStorage.getItem("userToken");
      const tokenExpireDate = localStorage.getItem("tokenExpireDate");

      if (!userId || !userToken || !tokenExpireDate) return;

      const remainingTime = tokenExpireDate - new Date().getTime();
      if (remainingTime < 0) return;

      logoutTimer = setTimeout(() => {
        context.dispatch("logout");
      }, remainingTime);

      context.commit("setUser", {
        userId,
        userToken,
        tokenExpireDate,
      });
    },
    logout(context) {
      console.log("action/logout");
      context.commit("logout");
    },
    async login(context, payload) {
      const response = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      const user = response.user;
      context.commit("setUser", {
        userId: user.uid,
        userToken: user.accessToken,
        tokenExpireDate: new Date().getTime() + 3600000,
      });
    },
    async signup(context, payload) {
      const response = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      const user = response.user;
      context.commit("setUser", {
        userId: user.uid,
        userToken: user.accessToken,
        tokenExpiresDate: new Date().getTime() + 3600000,
      });
    },
  },
};
