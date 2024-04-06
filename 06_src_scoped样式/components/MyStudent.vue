<template>
    <div class="demo">
        <h2 class="title">学生名称：{{name}}</h2>  
        <h2 class="test">学生性别：{{sex}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'MyStudent',
        data() {
            return {
                name: '余文君',
                sex: '男'
            }
        }
    }
</script>

<!-- 普通的style标签只支持普通的样式（即css），如果想要启用scss或less，需要为style标签设置lang属性 -->
<!-- 默认安装less：npm i less-loader（该语句是默认安装最新版本的less的） -->
<!-- 指定版本安装less：npm i less-loader@版本号 -->
<style scoped lang="less">
    .demo {
        background-color: pink;
        .test {
            color: red;
        }
    }
</style>

<!-- 
    补充：
        查看webpack的所有版本：npm view webpack versions
        查看less的所有版本：npm view less-loader versions
 -->