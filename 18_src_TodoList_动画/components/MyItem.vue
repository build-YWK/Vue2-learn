<template>
  <li>
      <label>
        <!-- 两种写法：1.使用@change；2.使用@click -->
        <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>

        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
        <!-- <input type="checkbox" v-model="todo.done"/> -->
        <span v-show="!todo.isEdit">{{todo.title}}</span>
        <!-- 
          @change在输入框发生变化且失去焦点后触发；
          @input在输入框内容发生变化后触发（在界面加载数据以前）
          @blur失去焦点就触发 
          $event通常的用法是用来获取当前元素的最新值：$event.target.value
        -->
        <input
          type="text"
          v-show="todo.isEdit"
          :value="todo.title"
          @blur="handleBlur(todo, $event)"
          ref="inputTitle"
        >
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
      <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
  </li>
</template>

<script>
  import PubSub from 'pubsub-js';

  export default {
    name: 'MyItem',
    // 声明接收todo
    props: ['todo'],
    methods: {
      // 勾选or取消勾选
      handleCheck(id) {
        // 通知App组件将对应的todo对象的done值取反
        // this.checkTodo(id)
        // 发送数据的触发自定义事件
        this.$bus.$emit('checkTodo', id)
      },
      // 删除
      handleDelete(id) {
        if(confirm('确认删除吗？')) {
          // 通知App组件将对应的todo对象的删除掉
          // this.deleteTodo(id)
          // 发送数据的触发自定义事件
          // this.$bus.$emit('deleteTodo', id)
          // 发布消息
          PubSub.publish('deleteTodo', id)
        }
      },
      // 编辑
      handleEdit(todo) {
        /* 
          这里是不能直接使用todo.hasOwnProperty('isEdit') 是不安全的.
          因为恶意客户机可能发送一个JSON值，如 {“hasOwnProperty”: 1}，并导致服务器崩溃。
          为了避免这种细微的bug，最好总是从Object.prototype调用这些方法。例如：
              todo.hasOwnProperty('isEdit')
          应该替换为：
              Object.hasOwnProperty.call(todo, 'isEdit')
        */
        if(Object.hasOwnProperty.call(todo, 'isEdit')) {    //这里还可以使用'isEdit' in todo
          console.log('todo身上有isEdit')
          todo.isEdit = true
        }else {
          console.log('todo身上没有isEdit')
          this.$set(todo, 'isEdit', true)
        }
        // 在下一次DOM更新结束后执行其指定的回调（使用$nextTick）
        this.$nextTick(function() {
          this.$refs.inputTitle.focus()
        })
        
        // 也可以通过定时器来实现（但是推荐使用上面这种方法）
        /* setTimeout(() => {
          this.$refs.inputTitle.focus()
        }); */
      },
      // 失去焦点回调（真正执行修改逻辑）
      handleBlur(todo, e) {
        todo.isEdit = false
        if(!e.target.value.trim()) return alert('输入不能为空')
        this.$bus.$emit('updateTodo', todo.id, e.target.value)
      }
    }
  }
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }

  li:hover {
    background-color: #ddd;
  }
  
  li:hover button {
    display: block;
  }
</style>