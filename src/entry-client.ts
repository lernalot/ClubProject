import { createApp } from "./main";
import '../JsBridge/index';
import "./style.css";

const { app, router, pinia } = createApp(false);

// 初始化 pinia
// 注意：__INITIAL_STATE__需要在 src/shims-global.d.ts中定义
if (window.__INITIAL_STATE__) {
  pinia.state.value = JSON.parse(window.__INITIAL_STATE__);
  window.__SSR_DATA__ = JSON.parse(window.__SSR_DATA__);
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
  // 等待JSBridge初始化完成
  readyJSBridge((bridge) => {
    // 在这里进行JSBridge相关操作
    console.log('JSBridge已准备就绪');
    window.brigeIsReady = true;
  });
});
