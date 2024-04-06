<template>
  <div class="todo-footer" v-show="total">
    <label>
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll"/> -->
      <!-- 另一种写法： -->
      <input type="checkbox" v-model="isAll"/>
    </label>
    <span>
      <span>已完成{{doneTotal}}</span> / 全部{{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>  
</template>

<script>
  export default {
    name: 'MyFooter',
    props: ['todos', 'checkAllTodo', 'clearAllTodo'],
    computed: {
      total() {
        return this.todos.length
      },
      doneTotal() {
        // 方法一：通过使用for循环实现页面展示已完成的数量
        /* var num = 0   //记录已完成的数量
        this.todos.forEach(todo => {
          if(todo.done) num++
        })
        return num */

        // 方法二：通过过滤器来过滤掉done为false的数据，留下done为true的数据
        // return this.todos.filter(todo => todo.done).length

        // 方法三：使用ES6中的reduce方法
        /* const x = this.todos.reduce((pre, current) => {
          return pre + (current.done ? 1 : 0)
        }, 0)
        return x */
        // 简写方式：
        return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
      },
      /* isAll() {
        return this.total === this.doneTotal && this.total > 0
      } */
      isAll: {    // 计算属性完整写法（不需要对计算属性进行数据操作时，才可以简写）
        get() {
          return this.total === this.doneTotal && this.total > 0
        },
        set(value) {
          this.checkAllTodo(value)
        }
      }
    },
    methods: {
      /* checkAll(e) {
        this.checkAllTodo(e.target.checked)
      } */
      clearAll() {
        if(confirm('确定删除吗？')) {
          this.clearAllTodo()
        }
      }
    }
  }
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>