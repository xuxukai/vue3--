import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {//登录
    path: '/',
    name: 'login',
    component: () => import('@/view/login.vue')
  },
  {//首页
    path: '/index',
    name: 'index',
    component: () => import('@/view/index/index.vue'),
    redirect: '/userpage',//重定向
    //二级路由
    children: [
      {
        path: '/userpage',
        name: 'userpage',
        component: () => import('@/view/userpage/user.vue'),
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/view/order/order.vue'),
      },
      {
        path: '/dishes',
        name: 'dishes',
        component: () => import('@/view/dishes/dishes.vue'),
      },
      {
        path: '/dishes_upload',
        name: 'dishes_upload',
        component: () => import('@/view/dishes_upload/index.vue'),
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/view/role_manage/role.vue'),
      },
      {
        path: '/data',
        name: 'data',
        component: () => import('@/view/dataImg/index.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
