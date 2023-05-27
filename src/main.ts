import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import Packy from '@libs/characters/Packy';

//@ts-ignore
// if (typeof global === "undefined") {
//   var global = window;
// }
createApp(App).use(createPinia()).mount('#app');
