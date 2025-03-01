// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 关闭vue的生产提示
Vue.config.productionTip = false


// 创建vm
new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this   //安装全局事件总线，$bus就是当前应用的vm
    },
})