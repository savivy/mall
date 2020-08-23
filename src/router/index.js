import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ()=>import('@/pages/Container/Container'),
      children:[
        {
          path:'menu',
          component:()=>import('@/pages/Menu/Menu')
        },
        {
          path:'menu/insert',
          component:()=>import('@/pages/Menu/Insert')
        },
        {
          path:'/menu/:id',
          component:()=>import('@/pages/Menu/Insert')
        },
        {
          path:"role",
          component:()=>import('@/pages/Role/Role')
        },
        {
          path:"role/insert",
          component:()=>import('@/pages/Role/Insert')
        },
        {
          path:"role/:id",
          component:()=>import('@/pages/Role/Insert')
        },
        {
          path:"user",
          component:()=>import('@/pages/User/User')
        },
        {
          path:"user/insert",
          component:()=>import('@/pages/User/Insert')
        },
        {
          path:"user/:id",
          component:()=>import('@/pages/User/Insert')
        },
        {
          path:"category",
          component:()=>import('@/pages/Category/Category')
        },
        {
          path:"category/insert",
          component:()=>import('@/pages/Category/Insert')
        },
        {
          path:"category/:id",
          component:()=>import('@/pages/Category/Insert')
        },
        {
          path:"specs",
          component:()=>import('@/pages/Specs/Specs')
        },
        {
          path:"specs/insert",
          component:()=>import('@/pages/Specs/Insert')
        },
        {
          path:"specs/:id",
          component:()=>import('@/pages/Specs/Insert')
        },
        {
          path:"seckill",
          component:()=>import('@/pages/Seckill/Seckill')
        },
        
        {
          path:"goods",
          component:()=>import('@/pages/Goods/Goods')
        },
        {
          path:"goods/insert",
          component:()=>import('@/pages/Goods/Insert')
        },
        {
          path:"goods/:id",
          component:()=>import('@/pages/Goods/Insert')
        },
        {
          path:"member",
          component:()=>import('@/pages/Member/Member')
        },
        
      ]
    },
    {
          path:"/login",
          component:()=>import('@/pages/Login/Login')
    }
  ]
})
