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

const RequestSelfLoginRecordModalTitle = "登录记录"
const UserSelfDeleteModalTitle = "账号注销"
const UserSelfDeleteModalTargetName = "立即注销"
const UserSelfUpdatePasswordTitle = "修改密码"

// 账号设置
export default function () {

    const userSelfBaseInfo = useAppSelector((state) => state.user.userSelfBaseInfo)

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
                    description: userSelfBaseInfo.email,
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
                    title: RequestSelfLoginRecordModalTitle,
                    actions: []
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

// export function UserSelfDeleteModalForm() {
//
//     return <ModalForm<UserSelfUpdatePasswordDTO>
//         modalProps={{
//             maskClosable: false
//         }}
//         isKeyPressSubmit
//         width={CommonConstant.MODAL_FORM_WIDTH}
//         title={UserSelfDeleteModalTitle}
//         trigger={<a className={"red3"}>{UserSelfDeleteModalTargetName}</a>}
//         onFinish={async (form) => {
//             await UserSelfDelete({code: form.code}).then(res => {
//                 ToastSuccess(res.msg)
//             })
//             return true
//         }}
//     >
//         <ProFormCaptcha
//             fieldProps={{
//                 maxLength: 6,
//                 allowClear: true,
//             }}
//             required
//             label="验证码"
//             placeholder={'请输入验证码'}
//             name="code"
//             rules={[{validator: ValidatorUtil.codeValidate}]}
//             onGetCaptcha={async () => {
//                 await UserSelfDeleteSendEmailCode().then(res => {
//                     ToastSuccess(res.msg)
//                 })
//             }}
//         />
//     </ModalForm>
// }
