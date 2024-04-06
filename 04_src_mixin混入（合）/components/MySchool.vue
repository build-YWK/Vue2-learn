<template>
    <div>
        <h2 @click="showName">学校名称：{{name}}</h2>  
        <h2>学校地址：{{address}}</h2>
    </div>
</template>

<script>
    // 引入混入（局部）
    // import { mixin1, mixin2 } from '../mixin';

    export default {
        name: 'MySchool',
        data() {
            return {
                name: '君子书院',
                address: '云墨山',
                // 组件中data的数据和methods的方法与mixin.js发生数据冲突时，以原本组件中的data和methods为主
                x: 666
            }
        },
        // mixins: [mixin1, mixin2],
        // 而对于钩子函数，是都会执行的，而且组件中的钩子函数在mixin.js中钩子函数的后面执行
        mounted() {
            console.log("你好啊！！！！！");
        }
    }
</script>