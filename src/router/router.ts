import loadable from '@loadable/component'
import { RouteInterface } from '@/types/route'
import { RouteUri } from '@/router/config'

// TODO: public路径从buildConfig里读取，注入环境变量使用
export const basename = ''

export const routes: RouteInterface[] = [
    {
        path: RouteUri.Login,
        component: loadable(() => import('@/pages/login')),
        exact: true,
        name: 'login',
    },
    {
        path: RouteUri.Root,
        component: loadable(() => import('@/pages/layout')),
        name: 'layout',
        routes: [
            {
                path: RouteUri.D3Earth,
                component: loadable(() => import('@/pages/page1/3dearth')),
                exact: true,
                auth: false,
            },

            {
                path: RouteUri.NotAuth,
                component: loadable(() => import('@/pages/status/no-auth')),
                exact: true,
            },
        ],
    },
    {
        path: RouteUri.NotFound,
        component: loadable(() => import('@/pages/status/404')),
        name: '404',
    },
]
