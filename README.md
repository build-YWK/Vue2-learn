# 笔记

[TOC]

## 脚手架文件结构

	├── node_modules 
	├── public
	│   ├── favicon.ico: 页签图标
	│   └── index.html: 主页面
	├── src
	│   ├── assets: 存放静态资源
	│   │   └── logo.png
	│   │── component: 存放组件
	│   │   └── HelloWorld.vue
	│   │── App.vue: 汇总所有组件
	│   │── main.js: 入口文件
	├── .gitignore: git版本管制忽略的配置
	├── babel.config.js: babel的配置文件
	├── package.json: 应用包配置文件 
	├── README.md: 应用描述文件
	├── package-lock.json：包版本控制文件

## 关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
    - vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
    - vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

## vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
    2. 获取：```this.$refs.xxx```

## props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

    1. 第一种方式（只接收）：```props:['name'] ```

    2. 第二种方式（限制类型）：```props:{name:String}```

    3. 第三种方式（限制类型、限制必要性、指定默认值）：

        ```js
        props:{
        	name:{
        	type:String, //类型
        	required:true, //必要性
        	default:'老王' //默认值
        	}
        }
        ```

    > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

## mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    第一步定义混合：

    ```
    {
        data(){....},
        methods:{....}
        ....
    }
    ```

    第二步使用混入：

    ​	全局混入：```Vue.mixin(xxx)```
    ​	局部混入：```mixins:['xxx']	```

## 插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

    ```js
    对象.install = function (Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(....)
    
        // 2. 添加全局指令
        Vue.directive(....)
    
        // 3. 配置全局混入(合)
        Vue.mixin(....)
    
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {...}
        Vue.prototype.$myProperty = xxxx
    	Vue.prototype.方法名 = () => {xxx}
    }
    ```

4. 使用插件：```Vue.use()```

## scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

## 总结TodoList案例

1. 组件化编码流程：

   （1）拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

   （2）实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

   - 一个组件在用：放在组件自身即可。
   - 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

   （3）实现交互：从绑定事件开始。

2. props适用于：

   （1）父组件 ==> 子组件 通信

   （2）子组件 ==> 父组件 通信（要求父组件先给子组件一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这些做。

## webStorage（浏览器本地存储）

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

   1. ```xxxxxStorage.setItem('key', 'value');```

      ​				该方法接收一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   2. ```xxxxxStorage.getItem('key');```

      ​				该方法接收一个键名作为参数，返回键名对应的值。

   3. ```xxxxxStorage.removeItem('key');```

      ​				该方法接收一个键名作为参数，并把该键名和对应的值从存储中删除。

   4. ```xxxxxStorage.clear();```

      ​				该方法会清空存储中的所有数据。

4. 备注：

   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage存储的内容，需要手动清除才会消失。
   3. ```xxxxxStorage.getItem('key');```如果xxx对应的value获取不到，那么getItem的返回值是null。
   4. ```JSON.parse(null)```的结果依然是```null```。

## 组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：（**xxx表示自定义事件的事件名，test表示回调函数，demo表示标识名**）

   1. 第一种方式，在父组件中：```<Demo @xxx="test"/>``` 或 ```<Demo v-on:xxx="test"/>```

   2. 第二种方式，在父组件中：

      ```js
      <Demo ref="demo"/>
      ......
      mounted() {
      	this.$refs.demo.$on('xxx', this.test)
      }
      ```

   3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('xxx', 数据)```

5. 解绑自定义事件：```this.$off('xxx')```

6. 组件上也可以绑定原生DOM事件，但是需要使用```native```修饰符。

7. **注意：**通过```this.$refs.demo.$on('xxx', 回调)```绑定自定义事件时，回调<strong style="color:red">要么配置在methods中，要么用箭头函数</strong >，否则this指向会出问题！

## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......,
   	beforeCreate() {
   		Vue.prototype.$bus = this	//安装全局事件总线，$bus就是当前应用的vm
   	},
   	......
   })
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身</span>或者<span style="color:red">直接写成箭头函数</span>。

      ```js
      methods: {
          demo(data) {......}
      },
      ......
      mounted() {
          this.$bus.$on('xxx', this.demo)
      }
      //或者
      mounted() {
          this.$bus.$on('xxx', (data) => {})
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxx', 数据)```

4. 最好在beforeDestroy钩子中，用<span style="color:red">$off去解绑当前组件所用到的事件</span>。

## 消息订阅与发布（pubsub）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入：```import PubSub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身</span>或者<span style="color:red">直接写成箭头函数</span>。

      ```js
      methods: {
          demo(msgName, data) {......}
      },
      ......
      mounted() {
          this.pubId = PubSub.subscribe('xxx', this.demo)	//订阅消息
      }
      //或者
      mounted() {
          this.pubId = PubSub.subscribe('xxx', (msgName, data) => {})
      }
      ```

   4. 提供数据：```PubSub.publish('xxx', 数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(this.pubId)```去<span style="color:red">取消订阅</span>。
   
## nextTick

   1. 语法：```this.$nextTick(回调函数)```
   2. 作用：在```下一次```DOM更新结束后执行其指定的回调。
   3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## Vue封装的过渡与动画

   1. 作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名。
   
   2. 图示：
   
      ![img](https://img-blog.csdnimg.cn/bdcedd45fc1d4001a3d8adf70fefca06.png)
   
   3. 写法：
   
      1. 准备好样式：
      
         - 元素进入的样式：
           1. v-enter：进入的起点
           2. v-enter-active：进入过程中
           3. v-enter-to：进入的终点
         - 元素离开的样式：
           1. v-leave：离开的起点
           2. v-leave-active：离开的过程中
           3. v-leave-to：离开的终点
      
      2. 使用```<transition>```包裹要过渡的元素，并配置name属性：
      
         ```vue
         <!-- 如果希望给元素添加初始渲染的动画效果，可以通过给transition组件设置apper -->
         <transition name="hello" appear>
         	<h1 v-show="isShow">你好啊！</h1>
         </transition>
         ```
      
      3. 备注：若有多个元素需要过渡，则需要使用```<transition-group>```，且每个元素都要指定```key```值。

## Vue脚手架配置代理

### 方法一

​	在vue.config.js中添加如下配置：

```js
devServer: {
	proxy: "http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源）

### 方法二

​	编写vue.config.js配置具体代理规则：

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {		// 匹配所有以'/api'开头的请求路径
        target: 'http://localhost:5000', 	//代理目标的基础路径
        pathRewrite: {'^/api': ''},    // 这个必须要
        changeOrigin: true
      },
      '/api2': {	// 匹配所有以'/api2'开头的请求路径
        target: 'http://localhost:5001',	//代理目标的基础路径
        pathRewrite: {'^/api2': ''},
        changeOrigin: true
      }
    }
  }
  /* 
    changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
    changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
    changeOrigin默认值为true
  */
})
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。

2. 缺点：配置略微繁琐，请求资源时必须加前缀。如下所示：

   ```js
   getStudents() {
   	// '/api'是前缀，要加在端口号的后面
   	axios.get('http://localhost:8080/api/students').then(
   		response => {
   			console.log('请求成功了', response.data)
   		},
   		error => {
   			console.log('请求失败了', error.message)
   		}
   	)
   }
   ```

## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <span style="color:red">父组件 ===> 子组件</span>。

2. 分类：**默认插槽、具名插槽、作用域插槽**

3. 使用方式：

   1. **默认插槽：**

      ```vue
      父组件中：
      	<MyCategory>
      		<div>html结构1</div>
      	</MyCategory>
      子组件中：
      	<template>
      		<div>
                  <!-- 定义默认插槽 -->
                  <slot>插槽默认内容...（没使用插槽时才会显示）</slot>
              </div>
      	</template>
      ```

   2. **具名插槽：**

      ```vue
      父组件中：
      	<MyCategory>
              <!-- 使用具名插槽，需要通过slot属性指定使用哪个插槽，即slot="插槽名" -->
      		<template slot="center">
              	<div>html结构1</div>
              </template>
              
              <!-- 只有在使用了template标签包裹着html结构时，才能使用v-slot，即v-slot:插槽名 -->
              <template v-slot:footer>
              	<div>html结构2</div>
              </template>
      	</MyCategory>
      子组件中：
      	<template>
      		<div>
                  <!-- 定义具名插槽 ———— 在默认插槽的基础上，加上name属性 -->
                  <slot name="center">插槽默认内容...（没使用插槽时才会显示）</slot>
                  <slot name="footer">插槽默认内容...（没使用插槽时才会显示）</slot>
              </div>
      	</template>
      ```

   3. **作用域插槽：**

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定</span>。（games数据在MyCategory组件中，但是使用数据所遍历出来的结构由App组件来决定）

      2. 具体编码：

         ```vue
         父组件中：
         	<MyCategory>
         		<template scope="scopeData">
         			<!-- 生成的是ul列表 -->
                 	<ul>
                      	<li v-for="(game, index) in scopeData.games" :key="index">{{game}}</li>
                     </ul> 
                 </template>
         	</MyCategory>
         
         	<MyCategory>
                 <!-- 这使用的是ES6中的解构赋值，以便于可以直接取到数据 -->
         		<template scope="{games}">
         			<!-- 生成的是ol列表 -->
                 	<ol>
                      	<li v-for="(game, index) in games" :key="index">{{game}}</li>
                     </ol> 
                 </template>
         	</MyCategory>
         
         	<MyCategory>
         		<template slot-scope="scopeData">
         			<!-- 生成的是h4标题 -->
         			<h4 v-for="(game, index) in scopeData.games" :key="index">{{game}}</h4>
                 </template>
         	</MyCategory>
         子组件中：
         	<template>
         		<div>
                     <!-- 定义作用域插槽 -->
                     <!-- 数据是在定义插槽的组件中，但是用该数据生成的结构是由插槽的使用者来决定的 -->
                     <slot :games="games">插槽默认内容...（没使用插槽时才会显示）</slot>
                 </div>
         	</template>
         
         	<script>
                 export default {
                     name: 'MyCategory',
                     props: ['title'],
                     //数据在子组件自身
                     data() {
                         return {
                             games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
                         }
                     }
                 }
             </script>
         ```


## Vuex

### 1.概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。（安装方式：```npm i vuex@3```）

### 2.何时使用？

> 多个组件需要共享数据时

### 3.搭建vuex环境

> **直接使用npm i vuex安装，得到的是默认版本，即vuex4版本。**
> **vue2中，要用vuex的3版本；**
> **vue3中，要用vuex的4版本。**

1. 安装vuex：```npm i vuex@3```（vuex4版本是只能在vue3中使用，所以要安装vuex3版本）

2. 创建文件：```src/store/index.js```

   ```js
   // 引入Vue核心库
   import Vue from 'vue'
   // 引入Vuex ———— 安装vuex（npm i vuex@3）
   import Vuex from 'vuex'
   // 应用Vuex插件
   Vue.use(Vuex)
   
   // 准备actions对象 —— 响应组件中用户的动作
   const actions = {}
   // 准备mutations对象 —— 修改state中的数据
   const mutations = {}
   // 准备state对象 —— 保存具体的数据
   const state = {}
   
   // 创建并暴露store
   export default new Vuex.Store({
       actions,
       mutations,
       state
   })
   ```

3. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   // 引入store
   import store from './store'
   ......
   
   // 创建vm
   new Vue({
       el: '#app',
       render: h => h(App),
       store
   })
   ```

### 4.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   // 引入Vue核心库
   import Vue from 'vue'
   // 引入Vuex
   import Vuex from 'vuex'
   // 引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       // 响应组件中加的动作
       jia(context, value) {
           console.log('actions中的jia被调用了', context, value)
           context.commit('JIA', value)
       }
   }
   
   const mutations = {
       // 执行加
       JIA(state, value) {
           console.log('mutations中的JIA被调用了', state, value)
           state.sum += value
       }
   }
   
   // 初始化数据
   const state = {
       sum: 0
   }
   
   // 创建并暴露store
   export default new Vuex.Store({
       actions,
       mutations,
       state
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('actions中的方法名', 数据)```或```$store.commit('mutations中的方法名, 数据')```

> **备注：**若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```。

### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。（和计算属性computed有点像）

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   // 准备getters —— 用于将state中的数据进行加工
   const getters = {
       bigSum(state) {
           return state.sum * 10
       }
   }
   
   // 创建并暴露store
   export default new Vuex.Store({
       ......
       getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```

### 6.四个map方法的使用

1. **mapState方法：**用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
   	// 借助mapState生成计算属性：sum、school、subject（对象写法）
   	...mapState({sum:'sum', school:'school', subject:'subject'}),
   
   	// 借助mapState生成计算属性：sum、school、subject（数组写法）
   	...mapState(['sum', 'school', 'subject']),
   }
   ```

2. **mapGetters方法：**用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
   	// 借助mapGetters生成计算属性：bigSum（对象写法）
   	...mapGetters({bigSum: 'bigSum'})
   
   	// 借助mapGetters生成计算属性：bigSum（数组写法）
   	...mapGetters(['bigSum'])
   }
   ```

3. **mapActions方法：**用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods: {
   	// 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（对象写法）
   	...mapActions({incrementOdd:'jiaOdd', incrementWait:'jiaWait'})
   
   	// 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（数组写法）
   	...mapActions(['jiaOdd', 'jiaWait'])
   }
   ```

4. **mapMutations方法：**用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods: {
   	// 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（对象写法）
   	...mapMutations({increment:'JIA', decrement:'JIAN'}),
   
   	// 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（数组写法）
   	...mapMutations(['JIA', 'JIAN']),
   }
   ```

> **备注：**mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```js
   ......
   //对不同功能的部分进行模块化
   //求和功能的相关配置
   const countAbout = {
       namespaced: true,	//开启命名空间（默认是false）
       actions: { ... },	//这部分主要写网络请求或其他业务逻辑的方法，若没有，则可以直接跳到mutations中
       mutations: { ... }.
       state: { ... },
       getters: { ... }          
   }
   
   //人员管理功能的相关配置
   const personAbout = {
       namespaced: true,	//开启命名空间（默认是false）
       actions: { ... },
       mutations: { ... }.
       state: { personList:[ ... ] },
       getters: { ... }          
   }
       
   //除了上述这种方式，还可以分别将countAbout和personAbout放在store下的count.js和person.js（要先创建js文件）
   //这样的话，就需要将其引入进来了，如下所示：
   import countOptions from './count'
   import personOptions from './person'
   
   // 创建并暴露store
   export default new Vuex.Store({
       modules: {
           countAbout: countOptions,
           personAbout: personOptions
       }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.personList
   //方式二：借助mapState读取
   ...mapState('countAbout', ['sum', 'school', 'subject'])
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取
   ...mapGetters('countAbout', ['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang', personObj)
   //方式二：借助mapActions
   ...mapActions('countAbout', {incrementOdd:'jiaOdd', incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON', personObj)
   //方式二：借助mapMutations
   ...mapMutations('countAbout', {increment:'JIA', decrement:'JIAN'})
   ```

## 路由

1. **什么是路由：**
   1. **一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。**
   2. **前端路由：key是路径，value是组件。**
2. vue-router的理解：vue的一个插件库，专门用来实现<span style="color:red">SPA应用</span>。
3. 对**SPA应用**的理解：
   1. 单页Web应用（single page web application，SPA）。
   2. 整个应用只有<span style="color:red">一个完整的页面</span>。
   3. 点击页面中的导航链接<span style="color:red">不会刷新</span>页面，只会做页面的<span style="color:red">局部更新</span>。
   4. 数据需要通过**ajax**请求获取。
4. 路由分类：
   1. **后端路由：**
      -  理解：value是function, 用于处理客户端提交的请求。
      - 工作过程：服务器接收到一个请求时, 根据请求路径找到匹配的函数来处理请求, 返回响应数据。
   2. **前端路由：**
      - 理解：value是component，用于展示页面内容。
      - 工作过程：当浏览器的路径改变时, 对应的组件就会显示。

### 1.基本使用

> **直接使用npm i vue-router安装，得到的是默认版本，即vue-router4版本。**
> **vue2中，要用vue-router的3版本；**
> **vue3中，要用vue-router的4版本。**

1. 安装vue-router：```npm i vue-router@3```（vue-router4版本是只能在vue3中使用，所以要安装vue-router3版本）

2. 引入VueRouter：```import VueRouter from "vue-router"```

3. 应用插件：```Vue.use(VueRouter)```

4. 编写```router```配置项：

   ```js
   // 该文件专门用于创建整个应用的路由器
   import VueRouter from "vue-router"
   // 引入组件
   import MyAbout from "@/components/MyAbout"
   import MyHome from "../components/MyHome"
   
   // 创建router实例对象，去管理一组一组的路由规则
   const router =  new VueRouter({
       routes: [
           {
               path: '/about',
               component: MyAbout
           },
           {
               path: '/home',
               component: MyHome
           }
       ]
   })
   
   //暴露router
   export default router
   ```

5. 使用```router-link```实现切换（active-class可配置高亮样式，to可指定目标路由的链接）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

6. 使用```router-view```指定展示位置

   ```vue
   <router-view></router-view>
   ```

### 2.几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

### 3.多级路由（嵌套路由）

1. 配置路由规则，使用```children```配置项：

   ```js
   // 该文件专门用于创建整个应用的路由器
   import VueRouter from "vue-router"
   // 引入组件
   import MyAbout from "@/pages/MyAbout"
   import MyHome from "@/pages/MyHome"
   import HomeNews from '@/pages/HomeNews'
   import HomeMessage from '@/pages/HomeMessage'
   
   // 创建并暴露一个路由器
   export default new VueRouter({
       routes: [
           {
               path: '/about',
               component: MyAbout
           },
           {
               path: '/home',
               component: MyHome,
               // 定义二级路由（子路由）
               children: [
                   {
                       // 子路由中的path不需要加上“/”，因为它会自动给你加上的
                       path: 'news',	//此处一定不要写：/news
                       component: HomeNews
                   },
                   {
                       path: 'message',	//此处一定不要写：/message
                       component: HomeMessage
                   }
               ]
           }
       ]
   })
   ```

2. 跳转（要写完整路径）：

   ```vue
   <!-- 指定子路由的链接时，一定要带上父路由的路径 -->
   <router-link active-class="active" to="/home/news">News</router-link>
   ```

### 4.路由的query参数

1. 传递参数：

   ```vue
   <!-- 跳转路由并携带query参数，to的字符串写法（不推荐） -->
   <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{ m.title }}</router-link>
   
   <!-- 跳转路由并携带query参数，to的对象写法（推荐） -->
   <router-link :to="{
       path: '/home/message/detail',
       query: {
           id: m.id,
           title: m.title
       }
   }">
       {{ m.title }}
   </router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```


### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用：

   1. 给路由命名：

      ```js
      export default new VueRouter({
          routes: [
              {
                  path: '/home',
                  component: MyHome,
                  children: [
                      {
                          path: 'message',
                          component: HomeMessage,
                          children: [
                              {
                                  // 命名路由 ———— 可以简化路由的跳转
                                  name: 'messageDetail',
                                  path: 'detail',
                                  component: MessageDetail
                              }
                          ]
                      }
                  ]
              }
          ]
      })
      ```
      
   2. 简化跳转：
   
      ```vue
      <!-- 简化前，需要写完整的路径 -->
      <router-link to="/home/message/detail">message</router-link>
      
      <!-- 简化后，直接通过名字跳转 -->
      <router-link :to="{name: 'messageDetail'}">message</router-link>
      
      <!-- 简化写法配合传递参数 -->
      <router-link :to="{
          name: 'messageDetail',
          query: {
              id: 666,
              title: '你好'
          }
      }">
          message
      </router-link>
      ```

### 6.路由的params参数

1. 配置路由，声明接收params参数

   ```js
   export default new VueRouter({
       routes: [
           {
               path: '/home',
               component: MyHome,
               children: [
                   {
                       path: 'message',
                       component: HomeMessage,
                       children: [
                           {
                               name: 'messageDetail',
                               // 使用占位符声明接收params参数
                               path: 'detail/:id/:title',
                               component: MessageDetail
                           }
                       ]
                   }
               ]
           }
       ]
   })
   ```
   
2. 传递参数

   ```vue
   <!-- 跳转路由并携带params参数，to的字符串写法（参数直接跟在路径后，不需要使用“?”拼接） -->
   <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{ m.title }}</router-link>
   
   <!-- 跳转路由并携带params参数，to的对象写法（使用了params参数，就不能使用path） -->
   <router-link :to="{
       name: 'messageDetail',
       params: {
           id: m.id,
           title: m.title
       }
   }">
       {{ m.title }}
   </router-link>
   ```

   > **特别注意：**路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置项！！！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```


### 7.路由的props配置

1. **作用：**让路由组件更方便的收到参数。

   ```js
   {
       name: 'messageDetail',
       path: 'detail',
       component: MessageDetail,
       // props的第一种写法，值为对象。该对象中的所有key-value都会以props的形式传给MessageDetail组件。
       // props: {a:1, b:'hello'}
   
       // props的第二种写法，值为布尔值。若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给MessageDetail组件。
       // props: true
   
       // props的第三种写法，值为函数。该函数返回的对象中每一组key-value都会通过props传给MessageDetail组件。
       props(route) {
           // 返回值必须是一个对象
           return {
               id:route.query.id,
               title:route.query.title
           }
       }
   }
   ```

2. 接收方式（和之前组件中props配置项的接收方式一样）

   ```js
   props: ['id', 'title']
   ```

### 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式。
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转的时候默认为```push```。
3. 如何开启```replace```模式：```<router-link replace ......>About</router-link>```

### 9.编程式路由导航

1. Vue提供了编程式导航，也就是利用JavaScript代码来实现地址的跳转，通过router实例方法来实现。

2. 作用：不借助```<router-link>```实现路由跳转，让路由跳转更加灵活。

3. 具体编码：

   ```js
   //使用<router-link>实现页面切换，这种方式属于声明式导航
   //编程式导航：$router的两个API ———— push和replace
   this.$router.push({
       name: 'messageDetail',
       query: {
           id: xxx,
           title: xxx
       }
   })
   
   this.$router.replace({
       name: 'messageDetail',
       params: {
           id: xxx,
           title: xxx
       }
   })
   
   this.$router.back()	//后退
   this.$router.forward()	//前进
   // go()方法的参数是一个整数，表示在history历史记录中前进或后退多少步（正则前，负则退）
   this.$router.go(3)
   ```


### 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```vue
   <!-- 缓存一个路由组件 -->
   <!-- 通过<keep-alive>实现缓存路由组件，并且需要include指定缓存哪个路由组件，即include='组件名' -->
   <!-- 如果不使用include配置项，那么会让在<router-view>中的所有路由组件都缓存 -->
   <keep-alive include="HomeNews">
       <router-view></router-view>
   </keep-alive>
   
   <!-- 缓存多个路由组件 ———— 使用数组 -->
   <keep-alive :include="['HomeNews', 'HomeMessage']"></keep-alive>
   ```


### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```：路由组件被激活时触发。
   2. ```deactivated```：路由组件失活时触发。

> **注意：**这两个生命周期钩子需要与```<keep-alive>```标签一起使用。也就是说，如果该组件没有使用缓存，那么这两个生命周期钩子是不起作用的。

### 12.路由守卫

1. 作用：对路由进行权限控制

2. **分类：全局守卫、独享守卫、组件内守卫**

3. <span style="color:red">全局守卫</span>：

   ```js
   const router =  new VueRouter({
       routes: [
           {
               name: 'myAbout',
               path: '/about',
               component: MyAbout,
               meta: { title:'关于', isAuth:true }
           }
       ]
   })
   
   // 全局守卫分为：全局前置路由守卫和全局后置路由守卫
   // 全局前置路由守卫 ———— 初始化的时候被调用；每次路由切换之前被调用
   router.beforeEach((to, from, next) => {
       console.log('前置路由守卫', to, from)
       // 当路由组件少时，可以写成to.path === '/xxx/...' 或 to.name === 'xxx'（不推荐）
       // 但当路由组件过多时，再使用上面这种写法过于复杂。此时就要使用到meta（在meta中设置判断属性）
       // meta：路由元信息
       if(to.meta.isAuth) {    //判断当前路由是否需要鉴权
           if(localStorage.getItem('school') === 'Yunmo Academy') {    //权限控制的具体规则
               next()  //放行
           }else {
               alert('学校名不对，无权限查看！')
               //next({name: 'myAbout'})     //指定放行到name为xxx的路由组件
           }
       }else {
           next()  //放行
       }
   })
   
   // 全局后置路由守卫 ———— 初始化的时候被调用；每次路由切换之后被调用（没有next）
   router.afterEach((to, from) => {
       console.log('后置路由守卫', to, from)
       document.title = to.meta.title || '硅谷系统'    //修改网页的title
   })
   ```

4. <span style="color:red">独享守卫</span>：

   ```js
   const router =  new VueRouter({
       routes: [
           {
               name: 'homeNews',
               path: 'news',
               component: HomeNews,
               meta: { isAuth:true, title:'新闻' },
               // 独享路由守卫
               beforeEnter(to, from, next) {
                   console.log('独享路由守卫', to, from)
                   // 写法与全局前置路由守卫一样，但不需要判断是否需要鉴权（非必要）
                   if(localStorage.getItem('school') === 'Yunmo Academy') {    //权限控制的具体规则
                       next()  //放行
                   }else {
                       alert('学校名不对，无权限查看！')
                   }
               }
           }
       ]
   })
   ```
   
5. <span style="color:red">组件内守卫</span>：

   ```js
   // 组件内路由守卫
   // 通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
       console.log('beforeRouteEnter', to, from)
       // 写法与独享路由守卫一样，同样不需要判断是否需要鉴权（非必要）
       if(localStorage.getItem('school') === 'Yunmo Academy') {    //权限控制的具体规则
           next()  //放行
       }else {
           alert('学校名不对，无权限查看！')
       }
   },
           
   // 通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
       console.log('beforeRouteLeave', to, from)
       next()
   }
   ```
   

> **独享路由守卫**与**组件内路由守卫**并不需要判断是否需要鉴权，因为它们是用于某个路由配置或某个组件的，是一对一的关系，并不是一对多的关系。也就是说，当使用了这两个路由守卫中的任何一个，就已经表明了必定要**鉴权**。

### 13.路由器的两种工作模式

1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着#号，不美观。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务器404的问题。

### 14.编程式路由多次执行问题

> 问题：编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？

1. 路由跳转有两种形式：声明式导航、编程式导航。
2. 声明式导航没有这类问题的，因为vue-router底层已经处理好了。

> 那么为什么编程式导航进行路由跳转的时候，会出现这种情况呢？
>
> **原因：触发这种情况是因为vue-router中引入了primise，当传递了多次重复的参数就会抛出异常。**

**解决方法：**

- 路由的```push```和```replace```都是VueRouter原型对象上的一个方法，所以每次路由跳转的时候都是通过这两个方法来实现，而这两个方法提供了三个参数，即```VueRouter.prototype.push(location,resolve,reject)```：

  1. 包含了路由以及携带参数的location
  2. 成功回调resolve
  3. 失败回调reject

- 那么**方法一**是：

  - 通过给push|replace方法传递相应的成功与失败回调函数来处理异常，可以捕获到当前错误，可以解决。

- 具体代码如下所示：

  ```js
  this.$router.push(
  	{   //第一个参数包含了路由跳转的一些信息，也就是router-link中的to，push方法中的location
  		name: 'search',
  		params: {
  			keyword: this.keyword
  		},
  		query: {
  			k: this.keyword.toUpperCase()
  		},
  	},
  	//第二个参数是成功后的回调，可以通过第一个参数接收到$router对象
  	($router) => {console.log($router)},
  	//第三个参数是失败后的回调，导航重复执行会在此处抛出异常
  	(error) => {console.log(error)}
  )
  ```

> 注意：这种写法“治标不治本”，将来在别的组件当中push|replace，编程式导航还是有类似的错误。（这从该方法的缺点就可看出）
>
> 缺点：每次调用都需要传递成功与失败的回调（组件数量少还行，但是如果组件数量过多，就显得很麻烦了）

- **方法二：**重写VueRouter原型对象中的push|replace方法，通过在上面新增一个判断来处理程序抛出的异常信息（治本的方法）

  > 这种方式修改过后再跳转路由就不需要再像第一种方式那样传递回调了

- 具体步骤：

  1. 先把VueRouter原型对象上的push|replace方法保存一份
  2. 重写push|replace

- 具体代码如下：

  ```js
  // 先把VueRouter原型对象上的push|replace方法保存一份
  const originPush = VueRouter.prototype.push
  const originReplace = VueRouter.prototype.replace
  
  // 重写push|replace
  // 第一个参数：告诉原来的push方法，你往哪里跳转（以及传递哪些参数）
  // 第二个参数：成功回调
  // 第三个参数：失败回调
  VueRouter.prototype.push = function(location, resolve, reject) {
      if(resolve && reject) {     //如果传入了resolve和reject两个回调，则正常执行原来的push方法
          // call与apply的区别：
          // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
          // 不同点：call与apply传递参数 -- call传递参数用逗号隔开；apply方法执行，传递数组
          originPush.call(this, location, resolve, reject)
      }else {     //否则就执行指定的方法
          originPush.call(this, location, () => {}, () => {})
          /* originPush(this, location, ($router) => {}, (error) => {
              console.log(error)
          }) */
      }
  }
  VueRouter.prototype.replace = function(location, resolve, reject) {
      if(resolve && reject) {
          originReplace.call(this, location, resolve, reject)
      }else {
          originReplace.call(this, location, () => {}, () => {})
      }
  }
  ```

- 这样我们就可以解决编程式导航多次执行（参数不变）报错的问题了。

> **补充：在package.json文件中的rules中加入"no-unused-vars": "off"，就可以让定义但未使用的变量不再报错（切记要重启）**



