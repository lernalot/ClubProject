import {
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// 一个nodejs服务 对应多个前端项目 
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: () => {
      return { name: "Home" };
    },
  },
  {
    path: "/club",
    name: "club",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/saver",
    name: "saver",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound/index.vue"),
  },
];

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
