import store from '../../store'
import util from '../util'

function storeToken (token) {
  if (!util.isEmpty(token)) {
    store.commit('updateToken', {token})
  }
}

export default function (request, next) {
  next(function (response) {
    if (response.ok) {
      storeToken(response.headers.get('token'))
      // let resData = response.data
      // when got biz error
      // if (resData.resultCode !== 1) {
        // show error
        // response.ok = false
      // }
      return response
    }
  })
}
