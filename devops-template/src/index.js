import Vue from 'vue'
import routes from './router'
import store from './store'
import '@/assets/scss/index.scss'

window.Pages = window.Pages || {}
window.Pages['template'] = {
    title: '前端模板',
    routes,
    store
}
window.Vue = new Vue({
    
})
