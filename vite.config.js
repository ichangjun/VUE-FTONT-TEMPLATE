/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-14 11:28:18
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-11 17:14:18
 * @FilePath: /vue-front-template/vite.config.js
 * @Description: vite配置
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      DefineOptions(),
      createSvgIconsPlugin({
        // 指定缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId样式
        symbolId: 'icon-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': join(__dirname, '/src'),
      },
    },
    server: {
      proxy: {
        '^/clubApi/.*': {
          target: env.VITE_BASE_DOMAIN,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/clubApi/, ''),
        },
      },
    },
  })
})
