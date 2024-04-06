<!-- App组件是汇总所有组件的 -->
<template>
    <div>
        <img src="./assets/logo.png" alt="Vue logo">
        <MySchool></MySchool>
        <MyStudent></MyStudent>
    </div>
</template>

<script>
    // 引入组件（可以加上.vue后缀名，也可以不加）
    import MySchool from './components/MySchool'
    import MyStudent from './components/MyStudent'

    export default {
        name: 'App',
        components: {
            MySchool,
            MyStudent
        }
    }
</script>