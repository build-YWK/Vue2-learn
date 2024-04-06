<template>
  <ul class="todo-main">
    <!-- 这里要使用transition-group，因为这里不止一个todo -->
    <!-- 这里使用第三方动画库。如果要使用自己写的，那就把name属性改回todo -->
    <transition-group
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__backInRight"
      leave-active-class="animate__backOutRight"
    >
      <MyItem
        v-for="todoObj in todos"
        :key="todoObj.id"
        :todo="todoObj"
      />
    </transition-group>
  </ul>
</template>

<script>
  // 引入第三方动画库animate.css
  import 'animate.css'
  import MyItem from './MyItem';

  export default {
    name: 'MyList',
    components: { MyItem },
    // 声明接收App传递过来的数据
    props: ['todos']
  }
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }

  /* 设置动画 */
  .todo-enter-active {
    animation: test 0.5s linear;
  }

  .todo-leave-active {
    animation: test 0.5s linear reverse;
  }

  @keyframes test {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0px);
    }
  }
</style>