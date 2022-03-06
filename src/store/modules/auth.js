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

export default {
  state() {
    return {
      firebaseApp: firebaseApp,
      auth: auth,
      userId: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
    },
  },
  actions: {
    async login(context, payload) {
      const user = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      console.log("returned data from firebase auth", user);
      context.commit("setUser", {
        userId: user.uid,
      });
    },
    async signup(context, payload) {
      const user = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      console.log("returned data from firebase auth", user);
      context.commit("setUser", {
        userId: user.uid,
      });
    },
  },
};
