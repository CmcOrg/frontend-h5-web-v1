import {useAppSelector} from "@/store";
import {List, Typography} from "antd";
import React, {ReactNode} from "react";
import {USER_CENTER_KEY_TWO} from "@/page/user/Self/Self";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";
import {UserSelfRefreshJwtSecretSuf} from "@/api/none/UserSelfController";
import {ModalForm, ProFormCaptcha, ProFormText} from "@ant-design/pro-components";
import CommonConstant from "@/model/constant/CommonConstant";
import {ValidatorUtil} from "@/util/ValidatorUtil";
import {NotBlankCodeDTO, SignEmailSignDelete, SignEmailSignDeleteSendCode} from "@/api/sign/SignEmailController";
import {SignSignInNameSignDelete, SignSignInNameSignDeleteDTO} from "@/api/sign/SignSignInNameController";
import {PasswordRSAEncrypt} from "@/util/RsaUtil";

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
                        <a onClick={() => {
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
                        userSelfInfo.email ? <UserSelfDeleteByCodeModalForm/> : <UserSelfDeleteByPasswordModalForm/>
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

// 账号注销：通过：密码
export function UserSelfDeleteByPasswordModalForm() {
    return (
        <ModalForm<SignSignInNameSignDeleteDTO>
            modalProps={{
                maskClosable: false
            }}
            isKeyPressSubmit
            width={CommonConstant.MODAL_FORM_WIDTH}
            title={UserSelfDeleteModalTitle}
            trigger={<a className={"red3"}>{UserSelfDeleteModalTargetName}</a>}
            onFinish={async (form) => {
                console.log('currentPassword', form.currentPassword)
                const currentPassword = PasswordRSAEncrypt(form.currentPassword)
                await SignSignInNameSignDelete({currentPassword}).then(res => {
                    ToastSuccess(res.msg)
                })
                return true
            }}
        >
            <ProFormText.Password
                fieldProps={{
                    allowClear: true,
                }}
                label="当前密码"
                name="currentPassword"
                rules={[{
                    required: true,
                }]}
            />
        </ModalForm>
    )
}

// 账号注销：通过：发送验证码
export function UserSelfDeleteByCodeModalForm() {

    return (
        <ModalForm<NotBlankCodeDTO>
            modalProps={{
                maskClosable: false
            }}
            isKeyPressSubmit
            width={CommonConstant.MODAL_FORM_WIDTH}
            title={UserSelfDeleteModalTitle}
            trigger={<a className={"red3"}>{UserSelfDeleteModalTargetName}</a>}
            onFinish={async (form) => {
                await SignEmailSignDelete({code: form.code}).then(res => {
                    ToastSuccess(res.msg)
                })
                return true
            }}
        >
            <ProFormCaptcha
                fieldProps={{
                    maxLength: 6,
                    allowClear: true,
                }}
                required
                label="验证码"
                name="code"
                placeholder={"请输入"}
                rules={[{validator: ValidatorUtil.codeValidate}]}
                onGetCaptcha={async () => {
                    await SignEmailSignDeleteSendCode().then(res => {
                        ToastSuccess(res.msg)
                    })
                }}
            />
        </ModalForm>
    )
}
