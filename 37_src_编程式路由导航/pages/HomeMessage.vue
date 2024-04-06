<template>
    <div>
        <ul>
            <li v-for="m in messageList" :key="m.id">
                <!-- 跳转路由并携带params参数，to的字符串写法（参数直接跟在路径后，不需要使用“?”拼接 -->
                <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{ m.title }}</router-link>&nbsp;&nbsp; -->

                <!-- 使用<router-link>实现页面切换，这种方式属于声明式导航 -->
                <!-- 跳转路由并携带params参数，to的对象写法（使用了params，就不能使用path） -->
                <!-- 给路由命名后，就可以使用name配置项来实现路由的跳转，即“name=路由名称” -->
                <router-link :to="{
                    name: 'messageDetail',
                    query: {
                        id: m.id,
                        title: m.title
                    }
                }">
                    {{ m.title }}
                </router-link>
                <!-- 编程式导航，不借助<router-link>就可以实现 -->
                <button @click="pushShow(m)">push查看</button>
                <button @click="replaceShow(m)">replace查看</button>
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>
    
<script>
    export default {
        name: 'HomeMessage',
        data() {
            return {
                messageList: [
                    {id: '001', title: '消息001'},
                    {id: '002', title: '消息002'},
                    {id: '003', title: '消息003'}
                ]
            }
        },
        methods: {
            pushShow(m) {
                this.$router.push({
                    name: 'messageDetail',
                    query: {
                        id: m.id,
                        title: m.title
                    }
                })
            },
            replaceShow(m) {
                this.$router.replace({
                    name: 'messageDetail',
                    query: {
                        id: m.id,
                        title: m.title
                    }
                })
            }
        }
    }
</script>