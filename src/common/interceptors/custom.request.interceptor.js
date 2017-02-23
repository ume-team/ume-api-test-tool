import store from '../../store'

export default function (request, next) {
  request.url = '/api/' + request.url
  request.headers.set('Token', store.state.token)
  next()
}
