<template>
    <div>
        <h2>我是MyAbout的内容</h2>
    </div>
</template>
    
<script>
    export default {
        name: 'MyAbout',
        mounted() {
            // console.log('@', this.$route)
        },

        // 组件内路由守卫
        // 通过路由规则，进入该组件时被调用
        beforeRouteEnter (to, from, next) {
            console.log('beforeRouteEnter', to, from)
            // 写法与独享路由守卫一样，同样不需要判断是否需要鉴权（非必要）
            if(localStorage.getItem('school') === 'Yunmo Academy') {    //权限控制的具体规则
                next()  //放行
            }else {
                alert('学校名不对，无权限查看！')
            }
        },
        
        // 通过路由规则，离开该组件时被调用
        beforeRouteLeave (to, from, next) {
            console.log('beforeRouteLeave', to, from)
            next()
        }
    }
</script>