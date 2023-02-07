const Page2 = () => import(/* webpackChunkName: 'page-2' */ '@/views/demo/Page2.vue')
const Page2_1 = () => import(/* webpackChunkName: 'page-2-1' */ '@/views/demo/Page2-1.vue')
const Page2_2 = () => import(/* webpackChunkName: 'page-2-2' */ '@/views/demo/Page2-2.vue')

export default {
    path: 'page-2',
    name: 'page-2',
    component: Page2,
    meta: {
        title: 'Page-2'
    },
    redirect: {
        name: 'page-2-1'
    },
    children: [
        {
            path: 'page-2-1',
            name: 'page-2-1',
            component: Page2_1,
            meta: {
                parent: 'page-2',
                title: 'Page-2-1'
            }
        },
        {
            path: 'page-2-2',
            name: 'page-2-2',
            component: Page2_2,
            meta: {
                parent: 'page-2',
                title: 'Page-2-2'
            }
        }
    ]
}
