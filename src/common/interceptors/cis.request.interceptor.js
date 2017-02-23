export default function (request, next) {
  request.url = '/api/' + request.url
  request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
  next()
}
