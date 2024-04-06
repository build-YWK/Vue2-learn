<template>
    <div>
        <h1 v-text="msg" ref="title"></h1>
        <button ref="btn" @click="showDOM">点我输出DOM元素</button>
        <MySchool ref="sch1" id="sch2"/>
    </div>
</template>

<script>
    // 引入MySchool组件
    import MySchool from './components/MySchool.vue'

    export default {
        name: 'App',
        components: {MySchool},
        data() {
            return {
                msg: '欢迎学习Vue！'
            }
        },
        methods: {
            showDOM() {
                console.log(this.$refs.title)   //真实DOM元素
                console.log(this.$refs.btn)     //真实DOM元素
                // 对于传统的html标签来说，使用id还是ref来获取DOM元素是没有区别的

                console.log(this.$refs.sch1)    //School组件的实例对象（vc，即VueComponent）
                console.log(document.getElementById('sch2'))    //School组件对应的完整的DOM结构（id会跑到School组件最外侧的根元素上）
                // 对于组件来说，是有区别的
            }
        }
    }
</script>