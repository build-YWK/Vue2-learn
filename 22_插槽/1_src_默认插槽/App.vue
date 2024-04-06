<template>
    <div class="container">
        <!-- 默认插槽 -->
        <!-- 插槽内容是在父组件中编译完成后，再传递给子组件的 -->
        <MyCategory title="美食">
            <img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
        </MyCategory>

        <MyCategory title="游戏">
            <ul>
                <li v-for="(game, index) in games" :key="index">{{ game }}</li>
            </ul>
        </MyCategory>
        
        <MyCategory title="电影">
            <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
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
    .container {
        display: flex;
        justify-content: space-around;
    }
</style>