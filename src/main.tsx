import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux";
import store from "@/store";
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import 'antd/dist/antd.variable.min.css';
import {BackTop, ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
// 引入：自定义样式
import './style/color.less'
import './style/layout.less'
import './style/size.less'
import './style/antd.less'
import './style/theme.less'

moment.locale('zh-cn');

// 自定义 console.error ↓
const consoleOldError = console.error

console.error = (message?: any, ...optionalParams: any[]) => {
    if (optionalParams && optionalParams.length) {
        if (optionalParams[0] === 'findDOMNode') { // 过滤 findDOMNode警告，TODO：等 antd 官方修复，然后删除
            return
        }
    }
    if (message === 'Warning: [antd: Modal] `visible` will be removed in next major version, please use `open` instead.') { // 过滤过期警告，TODO：等依赖升级，然后删除
        return;
    }
    if (typeof message === 'string' && message.startsWith("Warning: Tree missing follow keys:")) {
        return; // TODO：等 antd pro 官方修复，然后删除
    }
    consoleOldError(message, ...optionalParams)
}
// 自定义 console.error ↑

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <App/>
                <div title={"返回顶部"}>
                    <BackTop/>
                </div>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
)
