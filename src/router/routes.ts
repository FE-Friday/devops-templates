import { RouteConfig } from 'vue-router'

// 示例页面
import demo from './modules/demo'

const DevopsHome = () => import(/* webpackChunkName: 'devops-home' */ '@/views/index.vue')
const Page1 = () => import(/* webpackChunkName: 'page-1' */ '@/views/demo/Page1.vue')

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'devops-home',
        component: DevopsHome,
        redirect: {
            name: 'page-1'
        },
        children: [
            {
                path: 'page-1',
                name: 'page-1',
                component: Page1,
                meta: {
                    title: 'Page-1'
                }
            },
            demo
        ]
    }
]

export default routes
