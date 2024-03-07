/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-14 16:46:10
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-19 22:09:29
 * @FilePath: /vue-front-template/tailwind.config.js
 * @Description: tailwindcss配置文件
 */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  // tailwindcss 的应用范围
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        base: ['0.45rem', '0.55rem'],
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem'],
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
      },
      height: {
        header: '72px',
        main: 'calc(100vh - 72px)',
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836',
      },
      variants: {
        scrollbar: ['dark'],
      },
      // 毛玻璃效果
      backdropBlur: {
        '4xl': '240px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
