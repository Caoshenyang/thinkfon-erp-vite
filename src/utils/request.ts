import axios, { AxiosError } from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 10000
})

// 响应拦截器
// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    // Message.error(error.response.data.message)
    // 对响应错误做点什么
    // if (!error.response) {
    //   Message.error('网络异常，请稍后重置')
    // } else {
    //   Message.error(error.response.data.message)
    // }
    return Promise.reject(error)
  }
)

export default request
