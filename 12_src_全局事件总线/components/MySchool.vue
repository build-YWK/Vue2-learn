<template>
    <div class="school">
        <h2>学校名称：{{name}}</h2>  
        <h2>学校地址：{{address}}</h2>
    </div>
</template>

<script>
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
            // 绑定hello自定义事件
            this.$bus.$on('hello', (data) => {
                console.log('我是MySchool组件，收到了数据：', data)
            })
        },
        beforeDestroy() {
            // 在销毁之前解绑hello自定义事件
            this.$bus.$off('hello')
        }
    }
</script>

<style scoped>
    .school {
        background-color: skyblue;
        padding: 5px;
    }
</style>