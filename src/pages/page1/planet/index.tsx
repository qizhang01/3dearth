import * as React from 'react'
import { Button } from 'antd'
import { DECREMENT_COUNT, INCREMENT_COUNT, sub4Reducer } from '@/pages/page1/planet/reducer'
import { Panel } from '@/components/Panel'

const PageReducer: React.FC = () => {
    const [state, dispatch] = React.useReducer(sub4Reducer, { count: 0 })

    return <Panel>功能尚未开发</Panel>
}

export default PageReducer
