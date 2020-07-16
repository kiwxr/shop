import Vue from 'vue'
import VueRouter from 'vue-router'

// 重写路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 重写路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

//导入界面组件
const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Detail = () => import('views/detail/Detail')
const Profile = () => import('views/profile/Profile')
const Login = () => import('views/profile/account/Login')
const Register = () => import('views/profile/account/Register')
const Set = () => import('views/profile/account/Set')
const Order = () => import('views/order/Order')
// 导入个人信息界面的子组件
const ToPay = () => import('views/profile/child/ToPay')
const ToSent = () => import('views/profile/child/ToSent')
const ToReceive = () => import('views/profile/child/ToReceive')
const ToEvaluate = () => import('views/profile/child/ToEvaluate')

//商家部分
const MerchantLogin = () => import('views/merchant/merchantLogin')
const MerchantRegister  = () => import('views/merchant/merchantRegister')
const MerchantShow  = () => import('views/merchant/merchantShow')
const MerchantOrder  = () => import('views/merchant/merchantOrder')

  Vue.use(VueRouter)
  const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail,
      beforeEnter : ((to,from,next) => {
        next()
      })
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/set',
      name: 'set',
      component: Set
    },
    {
      path: '/profile',
      component: Profile,
      // 子组件
      children : [
        {
          path: '/profile/topay',
          name: 'topay',
          component: ToPay
        },
        {
          path: '/profile/tosent',
          name: 'tosent',
          component: ToSent
        },
        {
          path: '/profile/toreceive',
          name: 'toreceive',
          component: ToReceive
        },
        {
          path: '/profile/toevaluate',
          name: 'toevaluate',
          component: ToEvaluate
        },
        {
          path: '/',
          redirect: '/profile/toreceive'
        }
      ]
    },
    {
      path: '/merchant/login',
      component: MerchantLogin
    },
    {
      path: '/merchant/register',
      component: MerchantRegister
    },
    {
      path: '/merchant/show',
      component: MerchantShow
    },
    {
      path: '/merchant/order',
      name: 'merchantOrder',
      component: MerchantOrder
    },
    {
      path: '/',
      redirect: '/home'
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//前置钩子  跳转之前
router.beforeEach((to,from,next) => {
  document.title = to.meta.title || 'demo'
  next()
})
//后置钩子 跳转后
// router.afterEach((to,from) => {
//
// })

export default router
