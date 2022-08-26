// axios封装
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import router from "@/router";
import { ElLoading, LoadingOptions, ElNotification } from 'element-plus' // element相关内容
import { close, start } from '@/utils/nprogress' // 页面加载进度条
import { useCommon } from '@/store/modules/common' // 状态管理器

// 初始化状态管理器
const commonStore = useCommon()


const pendingMap = new Map() //当前所有请求的唯一key值集合

/**
 * 生成每个请求的唯一key
 */
const getPendingKey = (config: AxiosRequestConfig) => {
  let { url, method, data, headers } = config
  // if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [
    url,
    method,
    //后面根据业务再加
    // headers && headers.batoken ? headers.batoken : '',
    // headers && headers['ba-user-token'] ? headers['ba-user-token'] : '',
    // JSON.stringify(params),
    JSON.stringify(data)
  ].join('&')
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 */
const addPending = (config: AxiosRequestConfig) => {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}

/**
 * 删除重复的请求
 */
const removePending = (config: AxiosRequestConfig) => {
  const pendingKey = getPendingKey(config)
  // console.log('pendingMap', pendingMap)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

// 获取当前环境的请求路径
export const getUrl = (): string => {
  const value: string = import.meta.env.VITE_AXIOS_BASE_URL as string
  return value == 'getCurrentDomain' ? window.location.protocol + '//' + window.location.host : value
}

// 获取当前请求的端口号
export const getUrlPort = (): string => {
  let url = getUrl()
  return new URL(url).port
}

const noTokenUrlList: [string | undefined] = ['/authentication/admin/login'] // 不需要传递token的接口请求路径集合

/** 
 * 请求失败后的错误统一处理 
 */
const errorStatusHandle = (error: any) => {
  if (axios.isCancel(error)) return console.error(error.message)
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
    if (error.message.includes('timeout')) message = '网络请求超时！'
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

    ElNotification({
      type: 'error',
      message
    })
  }
}

interface Options {
  // 是否开启取消重复请求, 默认为 true
  CancelDuplicateRequest?: boolean
  // 是否开启loading层效果, 默认为false
  loading?: boolean
  // 是否开启简洁的数据结构响应, 默认为false
  reductDataFormat?: boolean
  // 是否开启接口错误信息展示,默认为true
  showErrorMessage?: boolean
  // 是否开启code不为0时的信息提示, 默认为true
  showCodeMessage?: boolean
  // 是否开启code为0时的信息提示, 默认为false
  showSuccessMessage?: boolean
}

const httpService = (axiosConfig: AxiosRequestConfig, options: Options = {}, loading: LoadingOptions = {}) => {
  // 初始化axios实例
  const Axios = axios.create({
    baseURL: getUrl(),
    timeout: 1000 * 10,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post'
  })

  options = Object.assign(
    {
      CancelDuplicateRequest: true, //是否开启取消重复请求，默认true
      loading: false, //是否开启页面级loading层效果，默认false
      reductDataFormat: false, //是否开启简洁的数据结构响应，默认true
      showErrorMessage: true, //是否开启接口错误信息提示，默认true
      showCodeMessage: true, //是否开启code不为0时的信息提示，默认true
      showSuccessMessage: false // 是否开启code为0时的信息提示, 默认为false
    },
    options
  )

  /* 请求拦截 */
  Axios.interceptors.request.use(
    (config) => {
      removePending(config)
      options.CancelDuplicateRequest && addPending(config)
      // 进度条加载
      start()
      //自动携带token
      if (config.headers) {
        if (!noTokenUrlList.includes(config.url)) {
          // 从状态管理器获取token数据
          config.headers['token'] = commonStore.getAdminToken
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  /* 响应拦截 */
  Axios.interceptors.response.use(
    (response) => {
      removePending(response.config)
      // 关闭进度条
      close()
      if (options.showCodeMessage && response.data && response.data.code != 200) {
        // console.log('特殊处理的逻辑，根据业务而定', response)
        ElNotification({
          type: 'error',
          message: response.data.message || response.data.errmsg || response.data.msg
        })
        if (response.data.code != 401) {
          return Promise.reject(response.data)
        } else {
          commonStore.removeToken()
        }
      } else if (options.showSuccessMessage && response.data && response.data.code == 200) {
        ElNotification({
          type: 'success',
          message: response.data.msg ? response.data.msg : '操作成功！'
        })
      }

      return options.reductDataFormat ? response.data : response
    },
    (error) => {
      error.config && removePending(error.config)
      // 关闭进度条
      close()
      options.showErrorMessage && errorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )
  return Axios(axiosConfig)
}

export default httpService

