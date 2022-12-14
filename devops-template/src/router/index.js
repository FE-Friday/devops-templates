const templateHome = () => import(/* webpackChunkName: 'templateHome' */'@/views')

const routes = [
    {
        path: 'template/:projectId?',
        component: templateHome,
        children: [
        ]
    }
]

export default routes
