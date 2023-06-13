//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route
import Index from '../views/static/index.vue'
import User from '../views/static/user.vue'
import Info from '@/views/static/info.vue'
import Footer from '@/layout/footer.vue'
import Header from '@/layout/header.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
const routes = [
  {
    path: '/', name: 'home', components: {
      default: Index,
      Footer,//命名视图
      Header
    }
  },
  { path: '/index', redirect: '/' },
  {
    path: '/user', name: 'user', component: User,
    meta: {
      title: 'user页面',
      Auth: true
    },
    children: [
      {
        path: 'info',
        component: Info
      }
    ]
  },
  { path: '/user/:id(\\d+)+', name: 'userId', component: User, props: true, },
  {
    path: '/adCate', name: 'adCate', component: () => import('../views/static/adCate.vue') //懒加载 
  },
  {
    path: '/classroom', name: 'classroom', component: () => import('../views/static/classroom.vue') //懒加载 
  },
  {
    path: '/school', name: 'school', component: () => import('../views/static/school.vue') //懒加载 
  },
  {
    path: '/dormitory', name: 'dormitory', component: () => import('../views/static/dormitory.vue') //懒加载 
  },
  {
    path: '/file', name: 'file', component: () => import('../views/static/file.vue') //懒加载 
  },
  {
    path: '/folder', name: 'folder', component: () => import('../views/static/folder.vue') //懒加载 
  },
  {
    path: '/page', name: 'page', component: () => import('../views/static/page.vue') //懒加载 
  },
  {
    path: '/dormitory_first', name: 'dormitory1', component: () => import('../views/static/dormitory_first.vue') //懒加载 
  },
  {
    path: '/dormitory_second', name: 'dormitory2', component: () => import('../views/static/dormitory_second.vue') //懒加载 
  },
  {
    path: '/dormitory_third', name: 'dormitory3', component: () => import('../views/static/dormitory_third.vue') //懒加载 
  },
  {
    path: '/login', name: 'login', component: () => import('../views/static/login.vue') //懒加载 
  },
  {
    path: '/object', name: 'object', component: () => import('../views/static/object.vue'),//懒加载
    children: [
      {
        path: '',
        name: 'objectinfo',//嵌套命名路由
        component: Info
      },
      {
        path: 'login',
        component: import('@//views/static/login.vue')
      },
    ]
  },
  {
    path: '/shops', name: 'shops', component: () => import('../views/static/shop.vue') //懒加载 
  },
  {
    path: '/cart', name: 'cart', component: () => import('../views/static/cart.vue') //懒加载 
  },

  {
    path: '/admin',
    name: 'admin',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'admin-index',
        component: () => import('@/views/admin/index.vue')
      },
      {
        path: 'info',
        name: 'admin-info',
        component: () => import('@/views/admin/info.vue')
      },
      {
        path: 'logout',
        name: 'admin-logout',
        component: () => import('@/views/admin/logout.vue')
      },
      {
        path: 'changepassword',
        name: 'admin-changepassword',
        component: () => import('@/views/admin/changepassword.vue')
      },
      {
        path: 'forgetpassword',
        name: 'admin-forgetpassword',
        component: () => import('@/views/admin/forgetpassword.vue')
      },
    ]
  },

  {
    path: '/:pathMatch(.*)*', name: '404', component: () => import('../views/404.vue') //懒加载 
  }
]
//创建路由管理 router
const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  //前置路由
  // if(to.name!=='cart'){
  //   next({name:'cart'})
  // }else{
  //   next();
  // }
  next();
})
//导出路由
export default router  