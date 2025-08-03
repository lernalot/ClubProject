import { createApp } from "./main";
import "./style.css";

const { app, router, pinia } = createApp();

// 初始化 pinia
// 注意：__INITIAL_STATE__需要在 src/shims-global.d.ts中定义
if (window.__INITIAL_STATE__) {
  pinia.state.value = JSON.parse(window.__INITIAL_STATE__);
}

router.beforeEach((to, from, next) => {
  // 在路由切换前可以添加一些逻辑
  console.log(`Navigating to ${to.fullPath}`);
  next();
});

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount("#app");

  console.log("hydrated");
});
