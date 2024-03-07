/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-04-14 20:28:41
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-20 20:34:21
 * @FilePath: /i-template/src/utils/request-api/index.js
 * @Description: 基于axios的接口请求实现类
 */
import Axios from 'axios'
import Qs from 'qs'
import { ContentTypeEnum, ResultEnum } from '../../constants/http-enum'
import { checkStatus } from './check-status'
import { message } from '../../libs'
import store from '../../store'
// 是否为本地开发环境
const isDev = process.env.NODE_ENV === 'development'
// 请求队列
const pendingRequest = new Map()
// 生成请求Key
const generateReqKey = (config) => {
  // 根据请求方案、请求地址、请求包体 判断是否为重复请求
  const { url, method, params, data } = config
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&')
}
// 将当前请求加入请求队列
const addPendingRequest = (config) => {
  const requestKey = generateReqKey(config)
  config.cancelToken =
    config.cancelToken ||
    new Axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}
// 检查队列中是否存在重复请求，如果存在则取消已发的请求
const removePendingRequest = (config) => {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey)
    cancelToken(requestKey)
    pendingRequest.delete(requestKey)
  }
}

const handleError = (err) => {
  const _code = err.code ? parseInt(err.code) : 500
  // 开发环境打印错误信息
  if (isDev) {
    message({
      text: err?.message,
      type: 'error',
    })
    console.error(`===status:${_code};===errorMessageText:${err?.message}`)
  }
  checkStatus(_code, err?.message)
}
class IAxios {
  options
  instance
  constructor(options) {
    this.options = options
  }
  request(configs, options) {
    this.instance = Axios.create()
    const _conf = JSON.parse(JSON.stringify(configs))
    const _opts = Object.assign({}, this.options, options)
    // 格式化接口地址，兼容第三方接口
    _conf.url =
      _conf?.url?.startsWith('http://') || _conf?.url?.startsWith('https://')
        ? _conf?.url
        : `${location.origin}/${_conf?.url}`
    // 示例项目接口校验码
    _conf.headers = {
      ..._conf.headers,
      icode: '5F2F93B88CC0BAFC',
    }
    // 处理token
    if (store.getters.token) {
      _conf.headers.Authorization = `Bearer ${store.getters.token}`
    }
    const {
      contentType,
      isShowErrorMessage,
      errorMessageText,
      isTransformRequestResult,
      isShowServerErrorMessage,
      isTimeout,
      timeoutNumber,
      ignorePendingRequest,
    } = _opts
    if (contentType) {
      this.instance.defaults.headers.post['Content-Type'] = contentType
    }
    // 是否需要设置超时时长
    if (isTimeout) {
      this.instance.defaults.timeout = timeoutNumber
    }

    // request拦截器
    this.instance.interceptors.request.use((config) => {
      // 检查是否存在重复请求，若存在则删除
      if (ignorePendingRequest) {
        removePendingRequest(config)
        addPendingRequest(config)
      }
      return config
    }, undefined)
    // response拦截器
    this.instance.interceptors.response.use(
      (res) => {
        const { data: _data, config } = res
        if (ignorePendingRequest) {
          removePendingRequest(config)
        }
        const { code, message, data } = _data
        switch (code) {
          case ResultEnum.SUCCESS:
            // 是否需要格式化接口出参
            if (isTransformRequestResult) {
              return Promise.resolve(data)
            } else {
              return Promise.resolve(_data)
            }
          default:
            // 是否统一处理业务异常
            if (isShowServerErrorMessage) {
              handleError({
                code: code?.toString(),
                config: config,
                isAxiosError: false,
                message: errorMessageText || message,
                name: '',
                response: res,
                toJSON: () => {
                  return {}
                },
              })
              return Promise.reject(data)
            }
            return Promise.resolve(_data)
        }
      },
      (err) => {
        if (ignorePendingRequest) {
          removePendingRequest(err.config || {})
        }
        if (Axios.isCancel(err)) {
          console.log('已取消的重复请求：' + err.message)
        }
        // 是否统一处理http接口请求异常
        if (isShowErrorMessage) {
          const { data, statusText } = err.response

          handleError({
            ...err,
            code: err.response?.status.toString(),
            message: errorMessageText || data?.message || statusText,
          })
        }
        return Promise.reject(err.response)
      },
    )
    // 接口请求
    return this.instance.request(_conf)
  }
}
/**
 * 请求类接口实现
 */
const Http = new IAxios({
  contentType: ContentTypeEnum.JSON,
  errorMessageText: '',
  formatDate: false,
  ignoreToken: false,
  isParseToJson: true,
  isShowErrorMessage: true,
  isShowServerErrorMessage: true,
  isTimeout: true,
  isTransformRequestResult: true,
  joinParamsToUrl: false,
  serverErrorMessage: '',
  timeoutNumber: 5000,
  ignorePendingRequest: true,
})
export default Http
