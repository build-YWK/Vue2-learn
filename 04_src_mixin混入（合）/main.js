// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 关闭vue的生产提示
Vue.config.productionTip = false

// 引入混入（全局）—— 这种方式会让所有的组件、vc和vm都有
import { mixin1, mixin2 } from './mixin'
Vue.mixin(mixin1)
Vue.mixin(mixin2)

// 创建vm
new Vue({
    el: '#app',
    render: h => h(App)
})