import Vue from 'vue'
import App from './App'
import HttpRequest from './utils/httpRequest'  // 封装好的request请求
Vue.prototype.$wxhttp=HttpRequest;//作为全局变量

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()