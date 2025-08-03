import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter } from "./router";

export const createApp = () => {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);
  const pinia = createPinia();
  app.use(pinia);
  return { app, router, pinia };
};
