const vue = new window.Vue()
const prefix = '/permission/api'

export default {
    getAllUser ({ commit }) {
        vue.$ajax.get(`${prefix}/user/blueking/user`).then(res => {
            commit('SET_USER', res)
        })
    },
    getAllUser2 ({ commit }) {
        return vue.$ajax.get(`${prefix}/user/blueking/user`)
    }
}
