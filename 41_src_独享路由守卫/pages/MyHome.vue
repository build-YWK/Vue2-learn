<template>
    <div>
        <h2>Home组件内容</h2>
        <div>
            <ul class="nav nav-tabs">
                <li>
                    <!-- 指定子路由的链接时，一定要带上父路由的路径 -->
                    <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
                </li>
                <li>
                    <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
                </li>
            </ul>
            <!-- 缓存一个路由组件 -->
            <!-- 通过<keep-alive>实现缓存路由组件，并且需要include指定缓存哪个路由组件，即include='组件名' -->
            <keep-alive include="HomeNews">
                <router-view></router-view>
            </keep-alive>

            <!-- 缓存多个路由组件 ———— 使用数组 -->
            <!-- <keep-alive :include="['HomeNews', 'HomeMessage']"></keep-alive> -->
        </div>
    </div>
</template>
    
<script>
    export default {
        name: 'MyHome',
        /* mounted() {
            console.log('MyHome组件挂载完毕了', this)
            window.homeRoute = this.$route
            window.homeRouter = this.$router
        }, */
    }
</script>