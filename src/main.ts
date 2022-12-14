import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vClickOutside from "click-outside-vue3";
import "./assets/tailwind.css";

createApp(App).use(store).use(router).use(vClickOutside).mount("#app");
