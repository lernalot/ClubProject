import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";
import pxtovw from 'postcss-px-to-viewport'
const loder_pxtovw = pxtovw({
//这里是设计稿宽度 自己修改
  viewportWidth: 750,
  // viewportWidth: 375,
  viewportUnit: 'vw'
})
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [loder_pxtovw]
    }
  }
})
