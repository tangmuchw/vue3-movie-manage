import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store/store'

Vue.use(VueRouter)

// 配置路由
const router = new VueRouter({
  mode: 'hash',
  routes: routes
})

router.beforeEach((to, from, next) => {
  console.log(to,from)
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (store.state.adminInfo != null) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})

export default router

