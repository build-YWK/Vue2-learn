<template>
    <div class="container">

        <!-- 通过作用域插槽将数据递过来 -->
        <MyCategory title="游戏">
            <template scope="demo">
                <ul>
                    <li v-for="(game, index) in demo.games" :key="index">{{ game }}</li>
                </ul>   
            </template>
        </MyCategory>

        <MyCategory title="游戏">
            <!-- 解构赋值 -->
            <template scope="{games}">
                <ol>
                    <li style="color: red;" v-for="(game, index) in games" :key="index">{{ game }}</li>
                </ol>   
            </template>
        </MyCategory>

        <MyCategory title="游戏">
            <template slot-scope="{games}">
                <h4 v-for="(game, index) in games" :key="index">{{ game }}</h4> 
            </template>
        </MyCategory>
        
    </div>
</template>
    
<script>
    import MyCategory from './components/MyCategory'
    
    export default {
        name: "App",
        components: { MyCategory }
    }
</script>

<style>
    .container, .foot {
        display: flex;
        justify-content: space-around;
    }

    h4 {
        text-align: center;
    }
</style>