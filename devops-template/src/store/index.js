import actions from './actions'
import Vue from 'vue'

const store = {
    namespaced: true,
    state: {
        userList: []
    },
    getters: {},
    mutations: {
        SET_USER (state, res) {
            state.userList = res
        }
    },
    actions
}

export default store
