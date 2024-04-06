<template>
    <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
            <h2>Vue Router Demo</h2>
            <button @click="back">后退</button>
            <button @click="forward">前进</button>
            <button @click="test">测试一下go</button>
        </div>
    </div>
</template>
    
<script>
    export default {
        name: 'MyBanner',
        methods: {
            back() {
                // 后退
                this.$router.back()
            },
            forward() {
                // 前进
                this.$router.forward()
            },
            test() {
                // go()方法的参数是一个整数，表示在history历史记录中前进或后退多少步（正则前，负则退）
                this.$router.go(3)
            }
        },
    }
</script>