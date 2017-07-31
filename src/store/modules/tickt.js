import Vue from 'vue'
import * as types from '../types'

export default {
    state:{
      type:"",
      count:""
      },
    getters: {
          userStatus: (state) => {
            console.log('getter state is' ,state)
            if(state.id_token){
              console.log('默认添加请求头',state.id_token)
              setHeaders(state)
            }
            return state
          }
        },
    mutations: {
        [types.USER_REG](state, data) {
            localStorage.setItem('user', JSON.stringify(data))
            Object.assign(state, data)
        },
        [types.USER_SIGNIN](state, data) {
            localStorage.setItem('user', JSON.stringify(data))
            Object.assign(state, data)
        },
        [types.USER_SIGNOUT](state) {
            localStorage.removeItem('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        [types.USER_REG]({commit}, user,token) {
          commit(types.USER_SIGNIN, user,token)
        },
        [types.USER_SIGNIN]({commit}, data) {
          commit(types.USER_SIGNIN, data)
        },
        [types.USER_SIGNOUT]({commit}) {
            commit(types.USER_SIGNOUT)
        }
    }
}