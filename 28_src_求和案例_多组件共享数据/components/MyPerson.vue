<template>
    <div>
        <h1>人员列表</h1>
        <h3 style="color: red;">MyCount组件求和为：{{ sum }}</h3>
        <input type="text" placeholder="请输入名字" v-model.trim="name">
        <button @click="add">添加</button>
        <ul>
            <li v-for="p in personList" :key="p.id">{{ p.name }}</li>
        </ul>
    </div>
</template>
    
<script>
    import { nanoid } from 'nanoid'

    export default {
        name: 'MyPerson',
        data() {
            return {
                name: ''
            }
        },
        computed: {
            personList() {
                return this.$store.state.personList
            },
            sum() {
                return this.$store.state.sum
            }
        },
        methods: {
            add() {
                if(!this.name) return alert('输入不能为空')
                const personObj = {id:nanoid(), name:this.name}
                this.$store.commit('ADD_PERSON', personObj)
                this.name = ''
            }
        },
    }
</script>

<style scoped>
    button {
        margin-left: 5px;
    }
</style>