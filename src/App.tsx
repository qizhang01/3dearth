import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { Loading } from '@/assets/images'
import '@/assets/style/theme.less'
import loadable from '@loadable/component'

const Login = loadable(() => import('@/pages/login'))
const Mainpage = loadable(() => import('@/pages/layout'))

const App: React.FC = () => {
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)

        return function() {
            setTimeout(() => {
                const loading = document.getElementById('loading-wrapper')
                if (loading) {
                    loading.style.display = 'none'
                }
            }, 400)
        }
    })

    return (
        <>
            <section id="loading-wrapper" style={{ opacity: loading ? 1 : 0 }}>
                <img src={Loading} alt="" />
            </section>

            <Router>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/root" component={Mainpage}></Route>
                <Redirect from="/" to="/login"></Redirect>
            </Router>
        </>
    )
}

export default App
