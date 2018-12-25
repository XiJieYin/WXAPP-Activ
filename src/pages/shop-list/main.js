import Vue from 'vue'
import App from '../shop-list/index'

const app = new Vue(App)
app.$mount()
export default {
    // 这个字段走 app.json
    config: {
        enablePullDownRefresh:false,
    }
  }