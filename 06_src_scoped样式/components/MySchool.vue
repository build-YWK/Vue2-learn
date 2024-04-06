<template>
    <div class="demo">
        <h2 class="title">学校名称：{{name}}</h2>  
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
        }
    }
</script>

<style scoped>
    .demo {
        background-color: skyblue;
    }
</style>