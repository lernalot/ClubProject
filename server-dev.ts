import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import { createServer as createViteServer } from "vite";

// 在ts文件里不能直接使用__dirname，所以需要使用这种方法
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // 以中间件模式创建 Vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // 使用 vite 的 Connect 实例作为中间件
  // 如果你使用了自己的 express 路由（express.Router()），你应该使用 router.use
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    // 非对称算法解密jwt token  ModHeader - Modify HTTP headers
    // 非对称加密算法是 RSA，使用公钥加密，私钥解密 有以下几种算法 
    try {
      // 1. 读取 index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
      //    同时也会从 Vite 插件应用 HTML 转换。
      //    例如：@vitejs/plugin-react 中的 global preambles
      //    vite用模板能力渲染ssr html todo-karl
      //    vite.transformIndexHtml 是一个异步函数 具体原理是 
      // 模板方法 ejs 服务端模板框架
      // 变量和合同html结合起来输出
      template = await vite.transformIndexHtml(url, template);

      // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
      //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
      //    并提供类似 HMR 的根据情况随时失效。
      //const { render } = await httpRequest.get('club', http:club.server.ts)
      //const { render } = await httpRequest.get('club', http:club.server.ts)
      //const { render } = await httpRequest.get('club', http:club.server.ts)
      //const { render } = await httpRequest.get('club', http:club.server.ts)
      //const { render } = await httpRequest.get('club', http:club.server.ts)
      const { render } = await vite.ssrLoadModule("/src/entry-server.ts");

      // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      //    函数调用了适当的 SSR 框架 API。
      //    例如 ReactDOMServer.renderToString()
      const { renderedHtml, state } = await render(url);

      // 5. 注入渲染后的应用程序 HTML 到模板中。 模板渲染
      const html = template
        .replace(`<!--ssr-outlet-->`, renderedHtml)
        .replace(`<!--pinia-state-->`, state);

      // 6. 返回渲染后的 HTML。node http server 返回
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(8900);
  console.log("Server is start at http://127.0.0.1:8900");
}

createServer();
