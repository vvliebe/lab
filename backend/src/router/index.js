import Vue from 'vue'
import Router from 'vue-router'
import App from '@/pages/app'
import Home from '@/pages/home/index'
import Login from '@/pages/login/index'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: {name: 'home'}
    },
    {
      path: '/',
      component: App,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   next({name: 'Login'})
// })

export default router
