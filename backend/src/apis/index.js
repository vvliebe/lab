import axios from 'axios'
import { Notification } from 'element-ui'

import UserAPI from './user'

axios.defaults.baseURL = '//api.vvliebe.org'

axios.interceptors.response.use(response => {
  console.log(response)
  return response.data
}, err => {
  let {data: {code, message, error}} = err.response
  if (code === 401) {
    // 登陆验证
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
