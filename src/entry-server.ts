import { createApp } from "./main";
import { renderToString } from "@vue/server-renderer";
import { getClubInfo } from './fetchs/ssrFetch';
import { useProductStore } from "./pinia/product/index";

export const render = async (url: string) => {
  const { app, router, pinia } = createApp();

  // set the router to the desired URL before rendering
  await router.push(url);
  await router.isReady();

  // 在这里可以调用所有的 SSR 请求
  // 例如：buisnessFetch.getClubInfo(clubId) 等函数可以在这里调用
  // 并将结果存储在一个对象中返回
  const clubId = "exampleClubId"; // 示例 clubId
  const clubInfo = await getAllSSrFetch(clubId);
  // 初始化store数据
  useProductStore(pinia).initProductList(clubInfo);

  // 注入vue ssr中的上下文对象
  const renderCtx: { modules?: string[] } = {};

  const renderedHtml = await renderToString(app, renderCtx);
console.log("renderedHtml", renderedHtml);
  const state = JSON.stringify(pinia.state.value);

  return { renderedHtml, state };
};

const getAllSSrFetch = async (clubId: string) => {
  // 在这里可以收集所有的 SSR 请求
  return Promise.all([
    getClubInfo(clubId) // 这里的 clubId 应该是从某个地方获取的
  ])
}