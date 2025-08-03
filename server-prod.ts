import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
// @ts-ignore
import { render } from "./dist/server/entry-server.js";

// 在ts文件里不能直接使用__dirname，所以需要使用这种方法
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const resolve = (p: string) => path.resolve(__dirname, p);
  // 模版使用打包好的
  const template = fs.readFileSync(
    resolve("./dist/client/index.html"),
    "utf-8"
  );

  // 请求静态资源
  app.use(
    "/assets",
    express.static(resolve("./dist/client/assets"), {
      maxAge: "1000h", // 设置缓存时间
    })
  );

  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    try {
      const { renderedHtml, state } = await render(url);

      // 5. 注入渲染后的应用程序 HTML 到模板中。
      const html = template
        .replace(`<!--ssr-outlet-->`, renderedHtml)
        .replace(`<!--pinia-state-->`, state);

      // 6. 返回渲染后的 HTML。
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      console.log((e as Error).stack);
      res.status(500).end((e as Error).stack);
    }
  });

  app.listen(8900);
  console.log("Server is start at http://127.0.0.1:8900");
}

createServer();
