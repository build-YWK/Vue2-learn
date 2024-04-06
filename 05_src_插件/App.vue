<template>
    <div>
        <MySchool/>
        <hr>
        <MyStudent/>
    </div>
</template>
    
<script>
    // 引入组件
    import MySchool from './components/MySchool.vue'
    import MyStudent from './components/MyStudent.vue'

    export default {
        name: 'App',
        components: {MySchool, MyStudent}
    }
</script>