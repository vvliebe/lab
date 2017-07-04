import axios from 'axios'
import { Notification } from 'element-ui'

import UserAPI from './user'

axios.defaults.baseURL = '//api.vvliebe.org'

axios.interceptors.response.use(response => {
  console.log(response)
  return response.data
}, err => {
  console.log(err.response)
  let {data: {code, message, error}} = err.response
  if (code === 401) {
    // 登陆验证
    Notification.error({
      title: '权限错误',
      message: '请先登陆',
      duration: 500,
      onClose: () => {
        if (window.location.href.indexOf('login') === -1) window.location.href = '/login'
      }
    })
  } else {
    Notification.error({
      title: error,
      message
    })
  }
  return Promise.reject(error.response)
})

export {
  UserAPI
}
