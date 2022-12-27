import routes from './router'
import store from './store'
import '@/assets/scss/index.scss'

window.Pages = window.Pages || {}
window.Pages['template'] = {
    title: '示例',
    routes,
    store
}
