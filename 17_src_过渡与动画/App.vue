<template>
    <div>
        <MyTest/>
        <MyTest2/>
        <MyTest3/>
    </div>
</template>
    
<script>
    // 引入组件
    import MyTest from './components/MyTest'
    import MyTest2 from './components/MyTest2'
    import MyTest3 from './components/MyTest3'

    export default {
        name: "App",
        components: { MyTest, MyTest2, MyTest3 }
    }
</script>