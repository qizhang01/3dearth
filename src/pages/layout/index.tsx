import * as React from 'react'
import { withRouter, Link, Switch, Route } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import { IMenuNav, menuNav } from '@/pages/layout/menu'
import { Auth } from '@/auth'
import { routeProps } from '@/types/route'
import './index.less'
import loadable from '@loadable/component'
import logo from '../../assets/images/ocbc.png'
const D3earth = loadable(() => import('@/pages/page1/3dearth'))
const Vrbuilding = loadable(() => import('@/pages/page1/vrbuilding'))

const { Sider, Header, Content } = Layout
const SubMenu = Menu.SubMenu

const AppLayout: React.FC<routeProps> = (routeProps: routeProps) => {
    const [collapsed, setCollapsed] = React.useState(false)
    const { routes } = routeProps

    const NavMenu = (nav: IMenuNav) => {
        return (
            <Menu.Item key={nav.uri}>
                <Link to={nav.uri ? nav.uri : '/'}>
                    <span>{nav.title}</span>
                </Link>
            </Menu.Item>
        )
    }

    const NavSubMenu = (nav: IMenuNav) => {
        return (
            <SubMenu key={nav.uri} title={nav.title}>
                {nav.children && nav.children.map(value => NavMenu(value))}
            </SubMenu>
        )
    }

    const logout = () => {
        Auth.cleanAuth()
    }

    return (
        <Layout>
            <Layout className="layout-warpper-content">
                {/* <Header>
                    <img src={logo}></img>
                    <Button onClick={logout}>退出</Button>
                </Header> */}

                <Content>
                    <Switch>
                        <Route path="/root/3dEarth" component={D3earth}></Route>
                        <Route path="/root/vrbuilding" component={Vrbuilding}></Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export default withRouter(AppLayout)
