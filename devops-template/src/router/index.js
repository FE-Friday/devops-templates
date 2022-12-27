const home = () => import(/* webpackChunkName: 'templateHome' */'../views/home.vue')

const routes = [
    {
        path: 'template',
        component: home
    }
]

export default routes
