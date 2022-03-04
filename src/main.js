import { createApp } from "vue";

import router from "./routes";
import App from "./App.vue";

const vm = createApp(App);

vm.use(router);

vm.mount("#app");
