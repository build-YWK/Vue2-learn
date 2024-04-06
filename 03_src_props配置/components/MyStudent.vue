<template>
    <div>
        <h1>{{msg}}</h1>
        <h2>学生名称：{{name}}</h2>  
        <h2>学生性别：{{sex}}</h2>  
        <h2>学生年龄：{{myAge+1}}</h2>
        <button @click="updateAge">尝试修改收到的年龄</button>
    </div>
</template>

<script>
    export default {
        name: 'MyStudent',
        data() {
            console.log(this)
            return {
                msg: '我是一个君子书院的学生',
                // 将你所要进行修改的props的数据复制一份到data，以便于修改时不会对props中的数据造成修改
                myAge: this.age
            }
        },
        methods: {
            // props中的接收到的数据是不建议进行修改的，如果修改了，那么Vue会发出警告。
            // 如果业务需求上确实需要修改，那么请复制props的内容到data中一份，然后再去修改data中的数据即可。
            updateAge(){
                this.myAge++
            }
        },

        // 简单声明接收
        props: ['name', 'age', 'sex']

        // 接收的同时对数据进行类型限制
        /* props: {
            name: String,
            age: Number,
            sex: String
        } */

        // 接收的同时对数据：进行类型限制+默认值的指定+必要性的限制（required和default一般不会同时出现）
        /* props: {
            name: {
                type: String,   //name的类型是字符串
                required: true  //name是必要的
            },
            age: {
                type: Number,
                default: 8     //默认值（不传时会使用）
            },
            sex: {
                type: String,
                required: true
            }
        } */
    }
</script>