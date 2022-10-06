import {useAppSelector} from "@/store";
import {List, Typography} from "antd";
import React, {ReactNode} from "react";
import {USER_CENTER_KEY_TWO} from "@/page/user/Self/Self";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";
import {UserSelfRefreshJwtSecretSuf} from "@/api/none/UserSelfController";

interface IUserSelfSetting {
    title: string
    description?: string
    actions: ReactNode[];
}

// TODO：登录记录
const RequestSelfLoginRecordModalTitle = "登录记录"
const UserSelfDeleteModalTitle = "账号注销"
const UserSelfDeleteModalTargetName = "立即注销"
const UserSelfUpdatePasswordTitle = "修改密码"

// 账号设置
export default function () {

    const userSelfInfo = useAppSelector((state) => state.user.userSelfInfo)

    return (
        <List<IUserSelfSetting>
            header={<Typography.Title level={5}>{USER_CENTER_KEY_TWO}</Typography.Title>}
            rowKey={"title"}
            dataSource={[
                {
                    title: '密码',
                    actions: []
                },
                {
                    title: '邮箱',
                    description: userSelfInfo.email,
                    actions: []
                },
                {
                    title: '刷新令牌',
                    description: '刷新之后，执行任意操作，都会要求重新登录，用于：不修改密码，退出所有登录',
                    actions: [
                        <a key="1" onClick={() => {
                            ExecConfirm(() => {
                                return UserSelfRefreshJwtSecretSuf().then(res => {
                                    ToastSuccess(res.msg)
                                })
                            }, undefined, '确定执行【刷新令牌】操作吗？')
                        }}>
                            执行刷新
                        </a>
                    ]
                },
                {
                    title: UserSelfDeleteModalTitle,
                    actions: [
                        <a key="1" className={"red3"}>{UserSelfDeleteModalTargetName}</a>
                    ]
                },
            ]}
            renderItem={item => (
                <List.Item actions={item.actions}>
                    <List.Item.Meta
                        title={item.title}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    )
}
