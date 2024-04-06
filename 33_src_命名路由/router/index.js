// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router"
// 引入组件
import MyAbout from "@/pages/MyAbout"
import MyHome from "@/pages/MyHome"
import HomeNews from '@/pages/HomeNews'
import HomeMessage from '@/pages/HomeMessage'
import MessageDetail from '@/pages/MessageDetail'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            name: 'myAbout',
            path: '/about',
            component: MyAbout
        },
        {
            path: '/home',
            component: MyHome,
            // 定义二级路由（子路由）
            children: [
                {
                    // 子路由中的path不需要加上“/”，因为它会自动给你加上的
                    path: 'news',
                    component: HomeNews
                },
                {
                    path: 'message',
                    component: HomeMessage,
                    children: [
                        {
                            // 命名路由 ———— 可以简化路由的跳转
                            name: 'messageDetail',
                            path: 'detail',
                            component: MessageDetail
                        }
                    ]
                }
            ]
        }
    ]
})