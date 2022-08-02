import Vue from 'vue'

// axios
import axios from 'axios'

const baseURL = {
  serverProd: "http://192.168.1.174:5000",
}

const axiosIns = axios.create({
// baseURL: process.env.NODE_ENV == 'development' ? null: baseURL.serverProd,
 // baseURL: baseURL.serverProd
})
// eslint-disable-next-line func-names
axiosIns.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  token ? config.headers.Authorization = `Bearer ${token}` : null
  return config
  // eslint-disable-next-line func-names
}, function (error) {
  return Promise.reject(error)
})

// eslint-disable-next-line func-names
axiosIns.interceptors.response.use(function (response) {
  return response
  // eslint-disable-next-line func-names
}, function (error) {
/*   if (error.response.status === 401) {
    store.dispatch('auth/resetData')
    router.push({ name: 'login' })
  } */
  return Promise.reject(error)
})

//Vue.prototype.$http = axiosIns

export default axiosIns