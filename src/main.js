import { createApp } from "vue";

import router from "./routes";
import store from "./store/index";

import App from "./App.vue";

const vm = createApp(App);

vm.use(router);
vm.use(store);

vm.mount("#app");
