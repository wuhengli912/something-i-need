import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import { api_checkToken } from "@/apis/users.js";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    meta: { breadlist: ['首页'] },
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        meta: { breadlist: ['账号管理', '添加账号'] },
        path: 'accountadd',
        name: 'accountadd',
        component: () => import('../views/modules/account/AccountAdd.vue'),
      },
      {
        meta: { breadlist: ['账号管理', '账号列表'] },
        path: 'accountlist',
        name: 'accountlist',
        component: () => import('../views/modules/account/AccountList.vue'),
      },
      {
        meta: { breadlist: ['账号管理', '修改密码'] },
        path: 'accountpwd',
        name: 'accountpwd',
        component: () => import('../views/modules/account/AccountPwd.vue'),
      },
      {
        meta: { breadlist: ['首页'] },
        path: 'index',
        name: 'index',
        component: () => import('../views/modules/home/Index.vue'),
      },
      {
        meta: { breadlist: ['订单管理'] },
        path: 'ordermanage',
        name: 'ordermanage',
        component: () => import('../views/modules/order/OrderManage.vue'),
      },
      {
        meta: { breadlist: ['店铺管理'] },
        path: 'shopmanage',
        name: 'shopmanage',
        component: () => import('../views/modules/shop/ShopManage.vue'),
      },
      {
        meta: { breadlist: ['销售统计', '商品统计'] },
        path: 'itemreport',
        name: 'itemreport',
        component: () => import('../views/modules/sale/ItemReport.vue'),
      },
      {
        meta: { breadlist: ['销售统计', '订单统计'] },
        path: 'orderreport',
        name: 'orderreport',
        component: () => import('../views/modules/sale/OrderReport.vue'),
      },
      {
        meta: { breadlist: ['商品管理', '商品列表'] },
        path: 'productlist',
        name: 'productlist',
        component: () => import('../views/modules/item/ProductList.vue'),
      },
      {
        meta: { breadlist: ['商品管理', '商品添加'] },
        path: 'productadd',
        name: 'productadd',
        component: () => import('../views/modules/item/ProductAdd.vue'),
      },
      {
        meta: { breadlist: ['商品管理', '商品分类'] },
        path: 'productsort',
        name: 'productsort',
        component: () => import('../views/modules/item/ProductSort.vue'),
      },
      {
        meta: { breadlist: ['首页', '个人中心'] },
        path: 'mycenter',
        name: 'mycenter',
        component: () => import('../views/modules/mycenter/Mycenter.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next()
  } else {
    api_checkToken({ token: localStorage.token }).then((res) => {
      if (res.data.code === 0) {
        next()
      } else {
        next('/')
      }
    });
  }
})
export default router
