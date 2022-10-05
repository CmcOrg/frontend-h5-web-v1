import {RouteContext, RouteContextType} from "@ant-design/pro-components"
import {Card, Tabs} from "antd";
import React from "react";
import {SettingOutlined, UserOutlined} from "@ant-design/icons/lib";
import UserSelfInfo from "@/page/user/Self/UserSelfInfo";
import UserSelfSetting from "@/page/user/Self/UserSelfSetting";

export const USER_CENTER_KEY_ONE = "个人资料"
export const USER_CENTER_KEY_TWO = "账号设置"

// 个人中心
export default function () {

    return (
        <RouteContext.Consumer>
            {(routeContextType: RouteContextType) => {
                return <Card>
                    <Tabs tabPosition={routeContextType.isMobile ? 'top' : 'left'}>
                        <Tabs.TabPane key={'1'} tab={
                            <span><UserOutlined/>{USER_CENTER_KEY_ONE}</span>
                        }>
                            <UserSelfInfo/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={'2'} tab={
                            <span><SettingOutlined/>{USER_CENTER_KEY_TWO}</span>
                        }>
                            <UserSelfSetting/>
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            }}
        </RouteContext.Consumer>
    )

}
