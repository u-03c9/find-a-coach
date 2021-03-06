import { createApp } from "vue";

import router from "./routes";
import store from "./store/index";

import App from "./App.vue";

import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";

const vm = createApp(App);

vm.use(router);
vm.use(store);

vm.component("base-card", BaseCard);
vm.component("base-button", BaseButton);
vm.component("base-badge", BaseBadge);
vm.component("base-spinner", BaseSpinner);
vm.component("base-dialog", BaseDialog);

vm.mount("#app");
