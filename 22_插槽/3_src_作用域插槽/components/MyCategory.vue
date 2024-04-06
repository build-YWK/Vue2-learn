<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <!-- 通过插槽发送数据给插槽的使用者 -->
        <!-- 作用域插槽 -->
        <slot :games="games" msg="hello">我是默认的一些内容</slot>
        <!-- 数据是在定义插槽的组件中，但是用该数据生成的结构是由插槽的使用者来决定的 -->
    </div>
</template>
    
<script>
    export default {
        name: 'MyCategory',
        props: ['title'],
        data() {
            return {
				games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
            }
        }
    }
</script>

<style scoped>
    .category {
        background-color: skyblue;
        width: 200px;
        height: 300px;
    }

    h3 {
        text-align: center;
        background-color: orange;
    }

    img {
        width: 100%;
    }

    video {
        width: 100%;
    }
</style>