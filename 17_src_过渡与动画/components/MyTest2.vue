<template>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <!-- 若多个元素都要过渡，则需要使用transition-group组件，且里面的每个元素都要指定key值 -->
      <transition-group name="hello" appear>
        <h1 v-show="!isShow" key="1">你好啊！</h1>
        <h1 v-show="isShow" key="2">云墨书院</h1>
      </transition-group>
    </div>
</template>
    
<script>
    export default {
      name: 'MyTest2',
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
    /* 如果没有配置v-enter-active和v-leave-active，那么过渡就要写在h1的css中 */
    /* transition: 1s linear; */
  }

  /* 这是过渡的写法： */
  /* 
    此时必要的是v-enter、v-enter-to、v-leave和v-leave-to，v-enter-active和v-leave-active是可选的。
    如果配置了v-enter-active和v-leave-active，那么就可以将过渡写在其中；
    如果没有，那么就需要将过渡写在其他css中
  */
  /* 进入的起点、离开的终点 */
  .hello-enter, .hello-leave-to {
    transform: translateX(-100%);
  }

  .hello-enter-active, .hello-leave-active {
    transition: 1s linear;
  }

  /* 进入的终点、离开的起点 */
  .hello-enter-to, .hello-leave {
    transform: translateX(0);
  }

  /* 
    v-enter：在元素被插入之前生效，在元素被插入之后的下一帧移除。
    v-enter-active：在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡动画完成之后移除。
    v-enter-to：在元素插入之后的下一帧生效（与此同时v-enter被移除），在过渡动画完成之后移除。
    v-leave：在离开过渡被触发时立刻生效，下一帧被移除。
    v-leave-active：在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡完成之后移除。
    v-leave-to：在离开过渡被触发之后的下一帧生效（与此同时v-leave被移除），在过渡动画完成之后移除。
  */
</style>