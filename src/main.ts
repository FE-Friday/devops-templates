import Vue from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

import { apiPlugin } from '@/api'
import { loadScript, throttleMessage, utilsPlugin } from './utils'
import { svgIconPlugin } from './plugins/svgIcon'

import './plugins/bk'

window.Vue = Vue

Vue.config.productionTip = false

Vue.use(utilsPlugin)
    .use(apiPlugin)
    .use(svgIconPlugin)

window.devopsVue = new Vue({
    router,
    pinia,
    render: h => h(App)
})

Promise.all([
    loadScript('/devops/static/devops/devops-utils.js')
]).then(() => {
    Vue.prototype.$bkMessage = throttleMessage(Vue.prototype.$bkMessage, 1500)
    if (document.querySelector('#app')) window.devopsVue.$mount('#app')
})
