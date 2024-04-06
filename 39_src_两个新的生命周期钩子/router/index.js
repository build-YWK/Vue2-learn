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
                            // 使用占位符声明接收params参数
                            path: 'detail',
                            component: MessageDetail,

                            // props配置的作用：让路由组件更方便的收到参数。
                            // props的第一种写法，值为对象。该对象中的所有key-value都会以props的形式传给MessageDetail组件。
                            // props: {a:1, b:'hello'}

                            // props的第二种写法，值为布尔值。若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给MessageDetail组件。
                            // props: true

                            // props的第三种写法，值为函数。该函数返回的对象中每一组key-value都会通过props传给MessageDetail组件。
                            props(route) {
                                // 返回值必须是一个对象
                                return {
                                    id:route.query.id,
                                    title:route.query.title
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
})