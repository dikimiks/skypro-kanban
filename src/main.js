import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
if (process.env.NODE_ENV === 'development') {
    const devtools = require('@vue/devtools');
    devtools.connect();
  }
  