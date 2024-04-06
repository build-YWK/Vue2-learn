<template>
    <div>
        <!-- 使用v-bind动态绑定age，那么获得的数据会是number类型的 -->
        <MyStudent name="余文君" sex="男" :age="20"/>
    </div>
</template>
    
<script>
    // 引入MyStudent组件
    import MyStudent from './components/MyStudent.vue'

    export default {
        name: 'App',
        components: {MyStudent}
    }
</script>