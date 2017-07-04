import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import App from '@/pages/app'
import Home from '@/pages/home/index'
import Login from '@/pages/login/index'

Vue.use(Router)
const router = new Router({
  mode: 'history',
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

router.beforeEach(async (to, from, next) => {
  if (to.name === 'Login') return next()
  let token = sessionStorage.getItem('access-token')
  if (!token) return next({name: 'Login'})
  let {code} = await axios.get('user/checkLogin', { params: {accessToken: token} })
  if (code === 200) return next()
  next({name: 'Login'})
})

export default router
