<template>
    <div>
        <h2 @click="showName">学生名称：{{name}}</h2>  
        <h2>学生性别：{{sex}}</h2>
    </div>
</template>

<script>
    // 引入混入（局部）
    // import { mixin1, mixin2 } from '../mixin';

    export default {
        name: 'MyStudent',
        data() {
            return {
                name: '余文君',
                sex: '男'
            }
        },
        // mixins: [mixin1, mixin2]
    }
</script>