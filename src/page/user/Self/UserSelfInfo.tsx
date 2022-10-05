import {ActionType, ProDescriptions} from "@ant-design/pro-components";
import {default as React, useRef} from "react";
import {useAppDispatch} from "@/store";
import {Form} from "antd";
import {USER_CENTER_KEY_ONE} from "@/page/user/Self/Self";
import {ToastSuccess} from "@/util/ToastUtil";
import {ValidatorUtil} from "@/util/ValidatorUtil";
import {UserSelfInfo, UserSelfInfoVO, UserSelfUpdateInfo, UserSelfUpdateInfoDTO} from "@/api/none/UserSelfController";
import {setUserSelfInfo} from "@/store/userSlice";

// 个人资料
export default function () {

    const appDispatch = useAppDispatch();

    const actionRef = useRef<ActionType>()

    const [useForm] = Form.useForm<UserSelfUpdateInfoDTO>();

    const currentForm = useRef<UserSelfUpdateInfoDTO>({})

    // 执行：更新用户基本信息
    function doSysUserSelfUpdateInfo(form: UserSelfUpdateInfoDTO) {
        return UserSelfUpdateInfo(form).then(res => {
            currentForm.current = form
            appDispatch(setUserSelfInfo(form))
            ToastSuccess(res.msg)
        })
    }

    return (
        <ProDescriptions<UserSelfInfoVO>
            formProps={{
                form: useForm
            }}
            title={USER_CENTER_KEY_ONE}
            actionRef={actionRef}
            request={() => {
                return new Promise((resolve) => {
                    UserSelfInfo().then(res => {
                        currentForm.current = res.data
                        appDispatch(setUserSelfInfo(res.data))
                        resolve({
                            success: true,
                            data: res.data
                        })
                    })
                })
            }}
            editable={{
                onSave: async (key, record) => {
                    await doSysUserSelfUpdateInfo({...record, avatarUri: currentForm.current.avatarUri})
                    return true;
                },
            }}
            column={1}
            columns={[
                {
                    title: '昵称',
                    dataIndex: 'nickname',
                    formItemProps: {
                        required: true,
                        rules: [
                            {
                                validator: ValidatorUtil.nicknameCanNullValidate
                            }
                        ],
                    },
                },
                {
                    title: '个人简介',
                    dataIndex: 'bio',
                    valueType: 'textarea',
                    fieldProps: {
                        showCount: true,
                        maxLength: 100,
                        allowClear: true,
                    },
                },
            ]}
        />
    )
}
