<template>
    <div class="app">
        <h1>{{ msg }}学生的姓名是：{{ studentName }}</h1>
        <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
        <MySchool :getSchoolName="getSchoolName"/>
        
        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法：使用@或v-on） -->
        <!-- 如果希望自定义事件只触发一次，那么就用once -->
        <!-- <MyStudent @student="getStudentName" @demo="m1"/> -->

        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法：使用ref） -->
        <!-- 绑定原生DOM事件需要使用到native修饰符，否则会被认为是自定义事件 -->
        <MyStudent ref="student" @click.native="show"/>
    </div>
</template>
    
<script>
    import MyStudent from './components/MyStudent.vue'
    import MySchool from './components/MySchool.vue'
    

    export default {
        name: 'App',
        components: {MySchool, MyStudent},
        data() {
            return {
                msg: '你好啊！',
                studentName: ''
            }
        },
        methods: {
            getSchoolName(name) {
                console.log("App收到了学校名：" + name)
            },
            getStudentName(name, ...params) {
                console.log('App收到了学生名：' + name, params)
                this.studentName = name
            },
            m1() {
                console.log('demo事件被调用了')
            },
            show() {
                alert("君临天下")
            }
        },
        mounted() {
            this.$refs.student.$on('student', this.getStudentName)  //绑定自定义事件
            // this.$refs.student.$on('student', (name, ...params) => {
            //     console.log('App收到了学生名：' + name, params)
            //     console.log(this)
            //     this.studentName = name
            // })

            // 触发一次之后就不能被触发了，使用once
            // this.$refs.student.$once('student', this.getStudentName)    //绑定自定义事件（一次性）
        },
    }
</script>

<style scoped>
    .app {
        background-color: gray;
        padding: 5px;
    }
</style>