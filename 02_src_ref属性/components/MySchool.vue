<template>
    <div class="school">
        <h2>学校名称：{{name}}</h2>  
        <h2>学校名称：{{address}}</h2>  
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
    }
</script>

<style>
    .school {
        background-color: skyblue;
    }
</style>