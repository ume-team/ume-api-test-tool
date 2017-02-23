import { Loading, Message } from '../services/ui'
import Util from '../util'

function toggleLoading (value) {
  if (value) {
    Loading.service({ fullscreen: true })
  } else {
    Loading.service({ fullscreen: true }).close()
  }
}

export default function (request, next) {
  // 显示Loading
  toggleLoading(true)
  request.timeout = Util.getConfigValue('SERVICE_TIME_OUT')

  next(function (response) {
    // 隐藏Loading
    toggleLoading(false)
    // 出现网络异常的场合
    if (!response.ok) {
      Message({
        type: 'error',
        message: '服务调用出现网络错误，无法调用指定服务，请检查网络'
      })
    }
  })
}
