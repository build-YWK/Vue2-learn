<template>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <!-- 对于transition组件中的name属性，可以用与区分多个动画的使用 -->
      <!-- 如果希望给元素添加初始渲染的动画效果，可以通过给transition组件设置apper -->
      <transition name="hello" appear>
        <h1 v-show="isShow">你好啊！</h1>
      </transition>
    </div>
</template>
    
<script>
    export default {
      name: 'MyTest',
      data() {
        return {
          isShow: true
        }
      }
    }
</script>

<style scoped>
  h1 {
    background-color: orange;
  }

  /* 这是动画的写法： */
  /* 此时需要写v-enter-active和v-leave-active，并且提前配置好动画 */
  /* 当transition组件中配置了name属性，那么v-enter-active就要改为xxx-enter-active */
  .hello-enter-active {
    animation: test 1s linear;
  }

  /* 同上 */
  .hello-leave-active {
    animation: test 1s linear reverse;
  }

  @keyframes test {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0px);
    }
  }
</style>