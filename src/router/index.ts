import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useTitle } from '@vueuse/core'

// 自动引入modules下的所有路由信息
const moduleFiles: any = import.meta.glob('./modules/*.ts', { eager: true })

// 通过 reduce 去搜集所有的模块的导出内容
const configRoutes = Object.keys(moduleFiles).reduce((routes: any = [], filepath: string) => {
  // 因为moduleFiles是一个函数，那么可以接受一个参数（string：文件的相对路径），调用其从而获取到对应路径下的模块的导出对象
  // 导出的对象中有一个属性：default，可以获取到默认导出的所有内容
  const value = moduleFiles[filepath].default

  // 我们判断导出的是不是数组，是则进行拓展解构
  if (Array.isArray(value)) {
    routes.push(...value)
  } else {
    // 否则直接加到routes中
    routes.push(value)
  }
  return routes
}, [])

const routes: Array<RouteRecordRaw> = [
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false
    },
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/AppLayout.vue'),
    children: [
      {
        // 首页
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
          requireAuth: false
        }
      },
      ...configRoutes,
    ]
  },
  // 404页面
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/common/404.vue'),
    meta: {
      title: '404',
      keepAlive: true,
      requireAuth: false
    },
  },
  // 所有匹配不到的页面都跳转到404页面
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    const title = useTitle()
    title.value = to.meta.title.toString()
  }
  next()
})

export default router;