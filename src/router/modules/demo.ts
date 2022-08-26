/*
 * @Description: 销售管理模块路由
 * @Version: 2.0
 * @Autor: yuxinqiang
 * @Date: 2022-08-10 18:01:25
 * @LastEditors: yuxinqiang
 * @LastEditTime: 2022-08-22 17:42:28
 */
export default {
  path: 'demo/',
  name: 'demo',
  component: () => import('@/views/demo/index.vue'),
  children: [],
  meta: {
    title: 'demo演示'
  }
}
