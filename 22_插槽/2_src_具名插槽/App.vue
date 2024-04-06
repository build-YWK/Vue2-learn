<template>
    <div class="container">
        <!-- 使用具名插槽，需要通过slot属性指定使用哪个插槽，即slot="插槽名" -->
        <MyCategory title="美食">
            <img slot="center" src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
            <a slot="footer" href="https://www.csdn.net/">更多美食</a>
        </MyCategory>

        <MyCategory title="游戏">
            <ul slot="center">
                <li v-for="(game, index) in games" :key="index">{{ game }}</li>
            </ul>
            <div class="foot" slot="footer">
                <a href="https://www.csdn.net/">单机游戏</a>
                <a href="https://www.csdn.net/">网络游戏</a>
            </div>
        </MyCategory>

        <MyCategory title="电影">
            <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
            <!-- 如果使用了template标签，那么就可以使用“v-slot:插槽名”的方式 -->
            <template v-slot:footer>
                <div class="foot">
                    <a href="https://www.csdn.net/">经典</a>
                    <a href="https://www.csdn.net/">热门</a>
                    <a href="https://www.csdn.net/">推荐</a>
                </div>
                <h4>欢迎前来观影</h4>
            </template>
        </MyCategory>
    </div>
</template>
    
<script>
    import MyCategory from './components/MyCategory'
    
    export default {
        name: "App",
        components: { MyCategory },
        data() {
            return {
                foods:['火锅','烧烤','小龙虾','牛排'],
				games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
				films:['《教父》','《拆弹专家》','《你好，李焕英》','《尚硅谷》']
            }
        },
    }
</script>

<style>
    .container, .foot {
        display: flex;
        justify-content: space-around;
    }

    h4 {
        text-align: center;
    }
</style>