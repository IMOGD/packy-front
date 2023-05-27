import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

//@ts-ignore
// if (typeof global === "undefined") {
//   var global = window;
// }
createApp(App).use(createPinia()).mount("#app");
