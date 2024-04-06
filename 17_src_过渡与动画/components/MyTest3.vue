<template>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <!-- 使用第三方动画需要配置以下 -->
      <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__swing"
        leave-active-class="animate__backOutUp"
      >
        <h1 v-show="!isShow" key="1">余文君</h1>
        <h1 v-show="isShow" key="2">云墨书生</h1>
      </transition-group>
    </div>
</template>
    
<script>
    // 引入第三方动画 ———— 通过npm install animate.css安装
    import 'animate.css'

    export default {
      name: 'MyTest3',
      data() {
        return {
          isShow: true
        }
      }
    }
</script>

<style scoped>
  h1 {
    background-color: skyblue;
  }
</style>