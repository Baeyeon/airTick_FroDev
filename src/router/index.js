import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import sinTickets from "../views/sinTickets";
import order from "../views/order"
import 'element-ui/lib/theme-chalk/index.css'
import '../plugins/element'
import doubTickets from "../views/doubTickets";
import register from "../views/register";
import seatTypeChoose from "../views/seatTypeChoose";
import userInfo from "../views/userInfo";
import pay from "../views/pay";
import airlineAdmin from "../views/airlineAdmin";
import orderAdmin from '../views/orderAdmin'
import change from '../views/change'
import changeInfo from '../views/changeInfo'

Vue.use(Router)

const router = new Router({
  mode:'hash',
  routes: [
    {  path: '/',redirect: '/login'},
    {  path:'/login',  component: Login  },
    {  path:'/register',  component: register  },
    {  path:'/sinTickets', component: sinTickets  },
    {  path:'/doubTickets',component: doubTickets},
    {  path: '/seatTypeChoose',component: seatTypeChoose},
    {  path:'/userInfo',component: userInfo  },
    {  path:'/pay',component: pay  },
    {  path: '/airlineAdmin',component: airlineAdmin },
    {  path: '/orderAdmin',component: orderAdmin  },
    {  path:'/order',component: order  },
    {  path:'/change',component: change  },
    {  path:'/changeInfo',component: changeInfo  },


    // {  path:'/userAdmin',component: userAdmin  },
  ]
})

// router.beforeEach(((to,from,next)=>{
//   if(to.path === '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if(!tokenStr) return next('/login')
//   next()
// }))

export default router
