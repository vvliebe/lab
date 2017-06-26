import axios from 'axios'

export default {
  login (data) {
    return axios.post('user/login', data)
  },
  register (data) {
    return axios.post('user/add', data)
  }
}
