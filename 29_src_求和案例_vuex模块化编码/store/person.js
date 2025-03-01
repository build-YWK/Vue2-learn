// 人员管理相关的配置
import axios from "axios"
import { nanoid } from "nanoid"
export default {
    // 开启命名空间（默认是false）
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            if(value.name.indexOf('王') === 0) {
                context.commit('ADD_PERSON', value)
            }else {
                alert('添加的人必须姓王！')
            }
        },
        addPersonServer(context) {
            axios.get('https://v1.hitokoto.cn/').then(
                response => {
                    context.commit('ADD_PERSON', {id:nanoid(), name:response.data.hitokoto})
                },
                error => {
                    alert(error.message)
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            console.log('mutations中的ADD_PERSON被调用了')
            state.personList.unshift(value)
        }
    },
    state: {
        personList: [
            {id: '001', name: '余文君'}
        ]
    },
    getters: {
        firstPersonName(state) {
            return state.personList[0].name
        }
    }
}