import { createSSRApp, createApp as createCsrApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter } from "./router";

export const createApp = (isServer) => {
  const app = isServer ? createSSRApp(App): createCsrApp(App);
  const router = createRouter();
  app.use(router);
  const pinia = createPinia();
  app.use(pinia);
  return { app, router, pinia };
};
