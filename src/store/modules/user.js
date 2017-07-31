import Vue from 'vue'
import * as types from '../types'

function setHeaders(state) {
    jQuery.ajaxSetup({
        headers: { // 默认添加请求头  
            "Author": "eventdove-team",
            "Authorization": 'Bearer ' + state.id_token,
            "content-Type": "application/json; charset=utf-8"
        }
    })
}

export default {
    state: {
        id: "",
        id_token: "",
        username: "",
        nickname:"",
        email:"",
        phone:"",
        percent:"",
        userPackage:"",
        avatar  : "/images/head.jpg",// 用户头像
        gender  :"",// 性别
        company : "",// 公司
        position: ""
            },
    getters: {
        userStatus: (state) => {
            // console.log('getters',state)
            if (state.id_token) {
                setHeaders(state)
            }
            return state
        },
        isLogin: (state) => {
            return  state.id !== ''
        },
        id:(state) =>{
            return state.id
        },
        user:(state) =>{
            return state.avatar
        }
    },
    mutations: {
        [types.USER_REG](state, data) {
            Object.assign(state, data)
            localStorage.setItem('user', JSON.stringify(data))
        },
        [types.USER_SIGNIN](state, data) {
            // console.log('mutations USER_SIGNIN',data)
            // console.log('data.id_token',data.id_token)
            Object.assign(state, data)

         if(data.profile){
            delete state.profile;
             state.gender=data.profile.gender,// 性别
             state.company=data.profile.company,// 公司
             state.position=data.profile.position,
             state.avatar = data.profile.avatar
             state.nickname = data.profile.nickname 
         }

         localStorage.setItem('user', JSON.stringify(state))
            setHeaders(state)
        },
        [types.USER_SIGNOUT](state) {
            localStorage.removeItem('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        [types.USER_REG]({ commit }, user, token) {
            commit(types.USER_SIGNIN, user, token)
        },
        [types.USER_SIGNIN]({ commit }, data) {
            // console.log('actions USER_SIGNIN')
            commit(types.USER_SIGNIN, data)
        },
        [types.USER_SIGNOUT]({ commit }) {
            commit(types.USER_SIGNOUT)
        }
    }
}
