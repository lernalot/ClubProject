import { createSSRApp, createApp as createCsrApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter } from "./router";
import { bridgeFit } from "../BridgeFit";

// 创建应用实例 登录试用所有的前端项目模型 管理系统 c端 jwt

export const createApp = (isServer) => {
  const app = isServer ? createSSRApp(App) : createCsrApp(App);
  const router = createRouter();
  if (!isServer) {
    router.beforeEach(async (to, from, next) => {
      const isLogined = await bridgeFit.checkLoginStatus('local');
      // 登录态检查
      if (to.meta.requiresAuth && !isLogined) {
        next({ name: 'Login', query: { redirect: to.fullPath } });
        return;
        // 需要登录态
      }
      console.log('Navigating from', from.fullPath, 'to', to.fullPath);
      next();
    });
  }
  // router.afterEach((to, from) => {
  //   console.log('Successfully navigated to', to.fullPath);
  // });
  app.use(router);
  const pinia = createPinia();
  app.use(pinia);
  app.directive('expose', {
    mounted(el, binding) {
      
      console.log('Directive value:', binding.value);
      // 这里可以添加更多逻辑，比如将值暴露到全局状态或其他操作
    }
  });
  return { app, router, pinia };
};
