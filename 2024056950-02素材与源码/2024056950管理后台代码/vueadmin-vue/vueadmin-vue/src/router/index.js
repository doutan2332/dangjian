import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Index from '../views/Index'

import axios from "../axios";
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: "首页"
        },
        component: Index
      },
      {
        path: '/sys/userCenter',
        name: 'UserCenter',
        meta: {
          title: "个人中心"
        },
        component: ()=>import('../views/sys/UserCenter')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(((to, from, next) => {
  let hasRoute = store.state.menus.hasRoute

  let token = localStorage.getItem("token")
  if (to.path == '/login') {
    next()
  } else if(!token) {
    next({path: '/login'})
  } else if(token && !hasRoute){
    axios.get("/sys/menu/nav",{
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      //拿到menuList
      store.commit("setMenuList",res.data.data.nav)
      //拿到用户权限，用于按钮的点击
      store.commit("setPermList",res.data.data.authorities)

      //动态绑定路由
      let newRoutes = router.options.routes

      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {
            //转换成路由
            let route = menuToRoute(e)
            //把路由添加到路由管理中
            if(route) {
              newRoutes[0].children.push(route)
            }
          })
        }
      })
      router.addRoutes(newRoutes)
      hasRoute = true
      store.commit("changeRouteStatus",hasRoute)
    }).catch(err => {
      console.log(err)
    })
  }

  next()
}))

const menuToRoute = (menu) => {
  if(!menu.component) {
    return null
  }

  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }

  route.component = () => import('@/views/'+ menu.component + '.vue');
  return route
}

export default router
