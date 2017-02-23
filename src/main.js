// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Http from 'vue-resource'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import serviceInterceptor from './common/interceptors/common.interceptor'
import CustomRequestInterceptor from './common/interceptors/custom.request.interceptor'
import CustomResponseInterceptor from './common/interceptors/custom.response.interceptor'

Vue.use(Http)
Vue.use(Element, { locale })

Vue.http.interceptors.push(CustomRequestInterceptor)
Vue.http.interceptors.push(serviceInterceptor)
Vue.http.interceptors.push(CustomResponseInterceptor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
