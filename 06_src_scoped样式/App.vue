<template>
    <div>
        <h1 class="title">你好啊！</h1>
        <MySchool/>
        <hr>
        <MyStudent/>
    </div>
</template>
    
<script>
    // 引入组件
    // 当两个组件中的样式名相同时，后引入的组件样式会覆盖掉先引入的组件样式（即最终的样式由最后引入的组件样式所决定）
    import MyStudent from './components/MyStudent.vue'
    import MySchool from './components/MySchool.vue'
    

    export default {
        name: 'App',
        components: {MySchool, MyStudent}
    }
</script>

<!-- 一般情况下，在App组件中写样式，很可能是所有组件都在用 -->
<style scoped>
    .title {
        color: red;
    }
</style>