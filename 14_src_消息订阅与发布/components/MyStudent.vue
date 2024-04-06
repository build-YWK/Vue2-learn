<template>
    <div class="student">
        <h2>学生名称：{{name}}</h2>  
        <h2>学生性别：{{sex}}</h2>
        <button @click="sendStudentName">把学生名给MySchool组件</button>
    </div>
</template>

<script>
    import PubSub from 'pubsub-js'

    export default {
        name: 'MyStudent',
        data() {
            return {
                name: '余文君',
                sex: '男'
            }
        },
        mounted() {
        },
        methods: {
            sendStudentName() {
                // this.$bus.$emit('hello', this.name)
                // 发布消息
                PubSub.publish('hello', 666)
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