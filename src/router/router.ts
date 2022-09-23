import loadable from '@loadable/component'
import { RouteInterface } from '@/types/route'
// TODO: public路径从buildConfig里读取，注入环境变量使用
export const basename = ''

export const routes: RouteInterface[] = [
    {
        path: "",
        component: loadable(() => import('@/pages/login')),
        exact: true,
        name: 'login',
    },
    {
        path:"",
        component: loadable(() => import('@/pages/layout')),
        name: 'layout',
        routes: [
            {
                path: "",
                component: loadable(() => import('@/pages/page1/3dearth')),
                exact: true,
                auth: false,
            },

            // {
            //     path:"",
            //     component: loadable(() => import('@/pages/status/no-auth')),
            //     exact: true,
            // },
        ],
    },
    {
        path: "",
        component: loadable(() => import('@/pages/status/404')),
        name: '404',
    },
    {
        path:"",
        component: loadable(() => import('@/pages/status/no-auth')),
        exact: true,
    },
]
