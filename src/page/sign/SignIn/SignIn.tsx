import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {Tabs} from 'antd';
import {useState} from 'react';
import ViteSvg from '../../../../public/vite.svg'
import SignLayout from "@/layout/SignLayout/SignLayout";
import CommonConstant from "@/model/constant/CommonConstant";
import {SignInFormHandler} from "@/page/sign/SignIn/SignInUtil";
import {InDev} from "@/util/CommonUtil";
import {getAppNav} from "@/App";
import PathConstant from "@/model/constant/PathConstant";

type TSignInType = 'account'; // 登录方式

export interface ISignInForm {
    account: string // 账号
    password: string // 密码
}

// 登录
export default function () {
    const [signInType, setSignInType] = useState<TSignInType>('account');
    return (
        <SignLayout className={"Geek-Blue"}>
            <LoginForm<ISignInForm>
                logo={ViteSvg}
                title={CommonConstant.SYS_NAME}
                subTitle="Will have the most powerful !"
                actions={
                    <div>或者 <a title={"注册"} onClick={() => getAppNav()(PathConstant.SIGN_UP_PATH)}>注册</a>
                    </div>
                }
                onFinish={async (form) => {
                    await SignInFormHandler(form)
                    return true
                }}
            >
                <Tabs activeKey={signInType} onChange={(activeKey) => setSignInType(activeKey as TSignInType)}
                      items={[{key: "account", label: "账号密码登录"}]}>
                </Tabs>
                {signInType === 'account' && (
                    <>
                        <ProFormText
                            name="account"
                            fieldProps={{
                                size: 'large',
                                allowClear: true,
                                prefix: <UserOutlined/>,
                            }}
                            placeholder={"登录名/邮箱"}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入登录名/邮箱'
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                allowClear: true,
                                prefix: <LockOutlined/>,
                            }}
                            placeholder={'密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码'
                                },
                            ]}
                        />
                    </>
                )}
                <div
                    className={"m-b-24 flex jc-sb"}
                >
                    {/* TODO */}
                    <ProFormCheckbox noStyle>
                        记住我
                    </ProFormCheckbox>
                    <a onClick={InDev}>
                        忘记密码了
                    </a>
                </div>
            </LoginForm>
        </SignLayout>
    )
}
