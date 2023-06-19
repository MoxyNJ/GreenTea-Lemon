import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import Request from './request'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 请求成功拦截
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    requestFailureFn: (err) => {
      // 请求失败拦截
      return err
    },
    responseSuccessFn: (res) => {
      // 响应成功拦截
      return res
    },
    responseFailureFn: (err) => {
      // 响应失败拦截
      return err
    }
  }
})

export default request
