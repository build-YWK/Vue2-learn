// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router"
// 引入组件
import MyAbout from "@/pages/MyAbout"
import MyHome from "@/pages/MyHome"
import HomeNews from '@/pages/HomeNews'
import HomeMessage from '@/pages/HomeMessage'
import MessageDetail from '@/pages/MessageDetail'

// 创建并暴露一个路由器
const router =  new VueRouter({
    // 通过mode配置项去设置路由的history模式或hash模式
    mode: 'history',
    routes: [
        {
            name: 'myAbout',
            path: '/about',
            component: MyAbout,
            meta: { title:'关于' }
        },
        {
            name: 'myName',
            path: '/home',
            component: MyHome,
            meta: { title:'主页' },
            // 定义二级路由（子路由）
            children: [
                {
                    name: 'homeNews',
                    // 子路由中的path不需要加上“/”，因为它会自动给你加上的
                    path: 'news',
                    component: HomeNews,
                    meta: { isAuth:true, title:'新闻' },
                    // 独享路由守卫
                    /* beforeEnter(to, from, next) {
                        console.log('独享路由守卫', to, from)
                        // 写法与全局前置路由守卫一样，但不需要判断是否需要鉴权（非必要）
                        if(localStorage.getItem('school') === 'Yunmo Academy') {    //权限控制的具体规则
                            next()  //放行
                        }else {
                            alert('学校名不对，无权限查看！')
                        }
                    } */
                },
                {
                    name: 'homeMessage',
                    path: 'message',
                    component: HomeMessage,
                    meta: { isAuth:true, title:'消息' },
                    children: [
                        {
                            // 命名路由 ———— 可以简化路由的跳转
                            name: 'messageDetail',
                            // 使用占位符声明接收params参数
                            path: 'detail',
                            component: MessageDetail,
                            meta: { isAuth:true, title:'详情' },

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

// 全局守卫分为：全局前置路由守卫和全局后置路由守卫
// 全局前置路由守卫 ———— 初始化的时候被调用；每次路由切换之前被调用
/* router.beforeEach((to, from, next) => {
    console.log('前置路由守卫', to, from)
    // 当路由组件少时，可以写成to.path === '/xxx/...' 或 to.name === 'xxx'（不推荐）
    // 但当路由组件过多时，再使用上面这种写法过于复杂。此时就要使用到meta（在meta中设置判断属性）
    // meta：路由元信息
    if(to.meta.isAuth) {    //判断当前路由是否需要鉴权
        if(localStorage.getItem('school') === 'Yunmo Academy') {    //权限控制的具体规则
            next()  //放行
        }else {
            alert('学校名不对，无权限查看！')
            // next({name: 'myAbout'})     //指定放行到name为xxx的路由组件
        }
    }else {
        next()  //放行
    }
}) */

// 全局后置路由守卫 ———— 初始化的时候被调用；每次路由切换之后被调用（没有next）
router.afterEach((to, from) => {
    console.log('后置路由守卫', to, from)
    document.title = to.meta.title || '硅谷系统'    //修改网页的title
})

export default router