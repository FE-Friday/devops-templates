import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import '@/plugins'
import { throttleMessage, loadScript, copy } from '@/utils'

window.Vue = Vue

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$copy = copy

window.devopsVue = new Vue({
    router,
    store,
    render: h => h(App)
})

loadScript('/devops/static/devops/devops-utils.js').then(() => {
    Vue.prototype.$bkMessage = throttleMessage(Vue.prototype.$bkMessage, 1500)
    if (document.querySelector('#app')) window.devopsVue.$mount('#app')
})
