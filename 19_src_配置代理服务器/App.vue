<template>
    <div>
        <button @click="getStudents">获取学生信息</button>
        <button @click="getCars">获取学生信息</button>
    </div>
</template>
    
<script>
    // 下载并引入axios ———— npm i axios
    import axios from 'axios';

    /* 
        同源策略是一种约定，它是浏览器最核心也最基本的安全功能。如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。
        同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

        代理服务器不会把收到的任何请求都转发给5000服务器。
        那么什么时候会发生这种情况呢？———— 当你请求的资源8080服务器本身就有，那么就不会把请求转发给5000服务器。
        public文件夹就相当于8080服务器的根路径 ———— 8080服务器中有什么内容，就是看public这个文件夹中有什么。

        于是就有一个问题：当你自身服务器已经有的资源，代理服务器是不会将请求发给5000服务器的，它是会直接从你自身服务器中拿。即不能灵活的控制代理。
    */
    export default {
        name: "App",
        methods: {
            getStudents() {
                // 使用代理服务器来解决同源策略（跨域）的问题
                // 这里的http://localhost:8080是代理服务器
                axios.get('http://localhost:8080/api/students').then(
                    response => {
                        console.log('请求成功了', response.data)
                    },
                    error => {
                        console.log('请求失败了', error.message)
                    }
                )
            },
            getCars() {
                // '/demo'是前缀，要加在端口号的后面
                axios.get('http://localhost:8080/demo/cars').then(
                    response => {
                        console.log('请求成功了', response.data)
                    },
                    error => {
                        console.log('请求失败了', error.message)
                    }
                )
            }
        }
    }
</script>