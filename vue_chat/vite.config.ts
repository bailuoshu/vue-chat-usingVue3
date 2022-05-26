// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//element-UI
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      //配置elementUI自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
   server: {
     cors: true, // 默认启用并允许任何源
     open: false, // 在服务器启动时自动在浏览器中打开应用程序
     port: 8080,
     //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
     proxy: {
       '^/api': {
         target: 'http://127.0.0.1',   //代理接口
         changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, '')
       }
     }
   },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
