<template>
    <div>
        <div class="row">
            <MyBanner/>
        </div>
        <div class="row">
            <div class="col-xs-2 col-xs-offset-2">
                <div class="list-group">
                    <!-- 原始html中我们使用a标签实现页面的跳转 -->
                    <!-- <a class="list-group-item active" href="./about.html">About</a> -->
                    <!-- <a class="list-group-item" href="./home.html">Home</a> -->

                    <!-- Vue中借助router-link标签实现路由的切换 -->
                    <!-- 浏览器的历史记录有两种写入方式：分别为push和replace，push是追加历史记录，replace是替换当前记录。路由跳转的时候默认为push -->
                    <router-link replace class="list-group-item" active-class="active" to="/about">About</router-link>
                    <router-link replace class="list-group-item" active-class="active" to="/home">Home</router-link>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="panel">
                    <div class="panel-body">
                        <!-- 指定组件的呈现位置 -->
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
    import MyBanner from './components/MyBanner'

    export default {
        name: "App",
        components: { MyBanner }
    }
</script>