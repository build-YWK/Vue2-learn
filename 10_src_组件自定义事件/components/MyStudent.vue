<template>
    <div class="student">
        <h2>学生名称：{{name}}</h2>  
        <h2>学生性别：{{sex}}</h2>
        <h2>当前求和为：{{ number }}</h2>
        <button @click="add">点我number++</button>
        <button @click="sendStudentName">把学生名给App</button>
        <button @click="unbind">解绑student事件</button>
        <button @click="death">销毁当前的Student组件的实例（vc）</button>
    </div>
</template>

<script>
    export default {
        name: 'MyStudent',
        data() {
            return {
                name: '余文君',
                sex: '男',
                number: 0
            }
        },
        methods: {
            add() {
                console.log('add回调被调用了')
                this.number++ 
            },
            sendStudentName() {
                // 通过this.$emit触发Student组件实例身上的yuwenkai事件（自定义事件）
                this.$emit('student', this.name, 666, 888, 999)
                // this.$emit('demo')
                // this.$emit('click')
            },
            unbind() {
                this.$off('student')    //解绑一个自定义事件
                // this.$off(['student', 'demo'])  //解绑多个自定义事件
                // this.$off()  //解绑所有的自定义事件
            },
            death() {
                this.$destroy()     //销毁了当前Student组件的实例，销毁后所有Student实例的自定义事件全都不奏效。（原生DOM事件同样）
            }
        }
    }
</script>

<style scoped lang="less">
    .student {
        background-color: pink;
        padding: 5px;
        margin-top: 20px;
    }
</style>