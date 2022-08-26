/*
 * @Description: vite.config项目基本使用配置
 * @Version: 2.0
 * @Autor: yuxinqiang
 * @Date: 2022-08-24 09:21:32
 * @LastEditors: yuxinqiang
 * @LastEditTime: 2022-08-24 10:01:23
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'; // node的path路径引用
import legacy from '@vitejs/plugin-legacy'
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport from 'postcss-px-to-viewport-8-plugin'  // 页面自适应单位转换
// 自定义图标库
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// const { VITE_PORT, VITE_OPEN, VITE_BASE_PATH, VITE_OUT_DIR, VITE_PROXY_URL, VITE_AXIOS_BASE_URL } = loadEnv(mode)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 为打包后的文件提供传统浏览器兼容性支持
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    createStyleImportPlugin({
      resolves: [
        ElementPlusResolve()
      ],
      libs: [
        // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`
          },
          ensureStyleFile: true // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
        },
      ]
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver()
      ],
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts'
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          customCollections: ['custom']
        })
      ],
      dirs: ['src/components'],
      extensions: ['vue', 'tsx'],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        // 这里是存放svg图标的文件地址，custom是自定义图标库的名称
        custom: FileSystemIconLoader('./src/assets/icons')
      }
    })
  ],
  base: './',   // 在生产中服务时的基本公共路径
  publicDir: 'public',  // 静态资源服务的文件夹, 默认"public"
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/': path.resolve(__dirname, 'src/'),
      '@assets/': path.resolve(__dirname, 'src/assets/'),
    }
  },
  server: {
    // port: 5173, //启动端口
    host: '0.0.0.0',
    cors: true,
    force: true,
    hmr: true,
    // 设置 https 代理
    proxy: {
      // '/api': {
      //   target: '', // 代理请求地址
      //   changeOrigin: true,
      //   rewrite: (path: string) => path.replace(/^\/api/, '')
      // },
      // 智慧工厂代理，用来测试请求封装
      '/authentication': {
        target: 'http://192.168.0.21:8088',
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/authentication/, '/authentication')
      },
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      //打包后移除console和注释
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 1920, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          exclude: [],
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  }
})
