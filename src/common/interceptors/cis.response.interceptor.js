export default function (request, next) {
  next(function (response) {
    if (response.ok) {
      let resData = response.data
      // 存在业务异常的场合
      if (!resData.success) {
        // 显示错误
        // response.ok = false
      }
      return response
    }
  })
}
