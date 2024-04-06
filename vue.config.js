// vue.config.js可以修改默认配置
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      // 入口
      entry: 'src/main.js'
    }
  },
  lintOnSave: false,   /* 关闭语法检查（其实这个方法没有用） */
  // 开启代理服务器（方式一）
  // 这种方式配置代理服务器的弊端：不能配置多个代理，即一次只能给一个服务器转发请求
  /* devServer: {
    proxy: 'http://localhost:5000'
  } */

  // 开启代理服务器（方式二）———— 可以配置多个代理
  devServer: {
    proxy: {
      // 匹配所有以'/api'开头的请求路径
      '/api': {
        target: 'http://localhost:5000',  //代理目标的基础路径
        pathRewrite: {'^/api':''},    // 这个必须要
        // ws: true,   //用于支持websocket
        // changeOrigin: true  //用于控制请求头中的host值
      },
      '/demo': {
        target: 'http://localhost:5001',
        pathRewrite: {'^/demo':''},
        // ws: true,   //用于支持websocket
        // changeOrigin: true  //用于控制请求头中的host值
      }
    }
  }
  /* 
    changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
    changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
    changeOrigin默认值为true
  */
})
