import * as React from 'react'
import { withRouter, Link, Switch, Route } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { GlobalOutlined, NodeIndexOutlined } from '@ant-design/icons'
import { Auth } from '@/auth'
import { routeProps } from '@/types/route'
import './index.less'
import loadable from '@loadable/component'
import logo from '../../assets/images/ocbc.png'
const D3earth = loadable(() => import('@/pages/page1/3dearth'))
const Vrbuilding = loadable(() => import('@/pages/page1/vrbuilding'))

const { Sider, Header, Content } = Layout

const AppLayout: React.FC<routeProps> = (routeProps: routeProps) => {
    const [collapsed, setCollapsed] = React.useState(false)
    const { routes } = routeProps

    const NavMenu = () => {
        return (
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <Link to="/root/3dEarth">
                        <GlobalOutlined></GlobalOutlined>
                        <span>3dEarth</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/root/vrbuilding">
                        <NodeIndexOutlined />
                        <span>vrBuilding</span>
                    </Link>
                </Menu.Item>
            </Menu>
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
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={() => {
                        setCollapsed(!collapsed)
                    }}
                >
                    {NavMenu()}
                </Sider>
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
