<template>
    <div>
        <h2>学生姓名：{{name}}}</h2>
        <h2>学生年龄：{{age}}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'MyStudent',
        data() {
            return {
                name: '余文君',
                age: 20
            }
        }
    }
</script>