import ApplicationError from './ApplicationError'
import Http from './Http'
import Storage, { STORAGE_TYPE } from './Storage'
import Util from './Util'

/**
 * 处理Ts服务的异常
 * @param  {Array} exceptions 服务端异常
 * @return {ApplicationError} 客户端异常
 */
function createAppErrByServerException (exceptions) {
  let ret = null
  let errorId = 'MAM007E'
  let errorParam = null
  let errorMessage = null
  // 系统异常的场合
  if (exceptions.some(item => item.id === 'SEMSG-DEFAULT')) {
    errorId = 'MAM007E'
  // 鉴权失败的场合
  } else if (exceptions.some(item => item.id === 'SEMSG-AUTH-FAIL')) {
    errorId = 'MAM005E'
  // 登录状态超时的场合
  } else if (exceptions.some(item => item.id === 'SEMSG-TIMEOUT')) {
    errorId = 'MAM002E'
  // 其它的场合
  } else {
    errorId = exceptions[0].id
    errorParam = null
    errorMessage = exceptions[0].message
  }
  ret = new ApplicationError(errorId, errorParam, errorMessage)
  return ret
}

function setToken (token) {
  if (!Util.isEmpty(token)) {
    Storage.setItem(STORAGE_TYPE.LOCAL, 'token', token)
  }
}

function getToken () {
  return Storage.getItem(STORAGE_TYPE.LOCAL, 'token')
}

export default class TsHttp {
  /**
   * 执行指定服务
   * @param  {String}  serviceId    服务ID(EMWS00001)
   * @param  {Array}   serviceParam 服务参数信息
   * @param  {Object}  config       服务配置信息
   * @return {Promise} Promise
   */
  static invoke (serviceId, serviceParam = [], config = {}) {
    const tsConfig = config
    // Headers
    tsConfig.headers = {
      TOKEN: getToken()
    }
    // Url
    const url = Util.getConfigValue('PROXY_KEY') + serviceId
    // 默认使用POST
    const method = Util.isEmpty(tsConfig.method) ? 'post' : tsConfig.method
    // 超时时间
    tsConfig.timeout = Util.getConfigValue('SERVICE_TIME_OUT')

    return new Promise((resolve, reject) => {
      // 调用指定服务
      Http[method](url, serviceParam, tsConfig).then((res) => {
        const resData = res.data
        setToken(res.headers.token)
        // 收到错误信息的场合
        if (resData.resultCode !== 1) {
          const exceptions = Util.isEmpty(resData.exceptions)
            ? [] : resData.exceptions
          const error = createAppErrByServerException(exceptions)
          reject(error)
        }
        resolve(resData.resultObject)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
