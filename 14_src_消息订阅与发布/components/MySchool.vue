<template>
    <div class="school">
        <h2>学校名称：{{name}}</h2>  
        <h2>学校地址：{{address}}</h2>
    </div>
</template>

<script>
    // 安装pubsub.js ———— npm i pubsub-js
    // 用于实现消息订阅与发布
    import PubSub from 'pubsub-js'

    export default {
        name: 'MySchool',
        data() {
            return {
                name: '君子书院',
                address: '云墨山'
            }
        },
        mounted() {
            // console.log('MySchool', this)
            /* this.$bus.$on('hello', (data) => {
                console.log('我是MySchool组件，收到了数据：', data)
            }) */
            // 订阅消息
            this.pubId = PubSub.subscribe('hello', (msgName, data) => {
                console.log(this)
                console.log('有人发布了hello消息，hello消息的回调执行了', msgName, data)
            })
        },
        beforeDestroy() {
            // this.$bus.$off('hello')
            // 取消订阅 ———— 需要的不是消息名，而是消息的id
            PubSub.unsubscribe(this.pubId)
        }
    }
</script>

<style scoped>
    .school {
        background-color: skyblue;
        padding: 5px;
    }
</style>