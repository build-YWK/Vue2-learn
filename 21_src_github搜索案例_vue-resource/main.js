// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入vue-resource插件（功能和使用axios一样，但是推荐使用axios）
import vueResource from 'vue-resource'
// 关闭vue的生产提示
Vue.config.productionTip = false
// 使用插件
Vue.use(vueResource)

// 创建vm
new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this   //安装全局事件总线
    },
})