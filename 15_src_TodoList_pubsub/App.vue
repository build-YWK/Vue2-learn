<template>
    <div id="root">
        <div class="todo-container">
            <div class="todo-wrap">
                <!-- 子组件传给父组件，通过绑定自定义事件 -->
                <MyHeader @addTodo="addTodo"/>
                <!-- 父组件传给子组件 -->
                <MyList :todos="todos"/>
                <!-- 子组件传给父组件，通过绑定自定义事件 -->
                <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo"/>
            </div>
        </div>
    </div>
</template>
    
<script>
    import PubSub from "pubsub-js";
    // 引入组件
    import MyHeader from "./components/MyHeader";
    import MyList from "./components/MyList";
    import MyFooter from "./components/MyFooter";

    export default {
        name: "App",
        components: { MyHeader, MyList, MyFooter },
        data() {
        return {
            //由于todos是MyHeader组件和MyFooter组件都在使用，所以放在App中（状态提升）
            todos: JSON.parse(localStorage.getItem('todos')) || []
        }
        },
        methods: {
            // 添加一个todo
            addTodo(todoObj) {
                this.todos.unshift(todoObj)
            },
            // 勾选or取消勾选一个todo
            checkTodo(id) {
                this.todos.forEach((todo) => {
                    if(todo.id === id) todo.done = !todo.done
                })
            },
            // 删除一个todo————由于使用pubsub-js会默认传两个参数，所以要使用“_”占个位
            deleteTodo(_, id) {
                this.todos = this.todos.filter(todo => todo.id !== id)
            },
            // 全选or取消全选
            checkAllTodo(done) {
                this.todos.forEach((todo) => {
                    todo.done = done
                })
            },
            // 清除所有已完成的todo
            clearAllTodo() {
                this.todos = this.todos.filter((todo) => {
                    return !todo.done
                })
                // 简写方式：
                // this.todos = this.todos.filter(todo => !todo.done)
            }
        },
        watch: {
            todos: {
                // 开启深度监视
                deep: true,
                handler(value) {
                    localStorage.setItem('todos', JSON.stringify(value))
                }
            }
        },
        mounted() {
            // 需要数据的绑定自定义事件
            this.$bus.$on('checkTodo', this.checkTodo)
            // this.$bus.$on('deleteTodo', this.deleteTodo)
            // 订阅消息
            this.pubId =  PubSub.subscribe('deleteTodo', this.deleteTodo)
        },
        // 在销毁之前解绑自定义事件
        beforeDestroy() {
            this.$bus.$off('checkTodo')
            // this.$bus.$off('deleteTodo')
            // 取消订阅
            PubSub.unsubscribe(this.pubId)
        }
    }
</script>

<style>
    /*base*/
    body {
        background: #fff;
    }

    .btn {
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    .btn-danger {
        color: #fff;
        background-color: #da4f49;
        border: 1px solid #bd362f;
    }

    .btn-danger:hover {
        color: #fff;
        background-color: #bd362f;
    }

    .btn:focus {
        outline: none;
    }

    .todo-container {
        width: 600px;
        margin: 0 auto;
    }

    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>