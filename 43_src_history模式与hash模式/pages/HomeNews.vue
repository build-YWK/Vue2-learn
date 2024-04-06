<template>
    <ul>
        <li :style="{opacity}">欢迎学习Vue</li>
        <li>news001 <input type="text"></li>
        <li>news002 <input type="text"></li>
        <li>news003 <input type="text"></li>
    </ul>
</template>
    
<script>
    export default {
        name: 'HomeNews',
        data() {
            return {
                opacity: 1
            }
        },
        /* beforeDestroy() {
            console.log('HomeNews组件即将被销毁了')
            clearInterval(this.timer)
        }, */
        /* mounted() {
            this.timer = setInterval(() => {
                console.log('@')
                this.opacity -= 0.01
                if(this.opacity <= 0) this.opacity = 1
            }, 16);
        }, */
        // 路由组件被激活时触发
        activated() {
            console.log('HomeNews组件被激活了')
            this.timer = setInterval(() => {
                console.log('@')
                this.opacity -= 0.01
                if(this.opacity <= 0) this.opacity = 1
            }, 16);
        },
        // 路由组件失活时触发
        deactivated() {
            console.log('HomeNews组件失活了')
            clearInterval(this.timer)
        },
        // 这两个生命周期钩子需要与<keep-alive>标签一起使用。也就是说，如果该组件没有使用缓存，那么这两个生命周期钩子是不起作用的。
    }
</script>