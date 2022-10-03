import {YesNoDict} from "@/util/DictUtil";
import {ProFormColumnsType} from "@ant-design/pro-components";
import {SysUserInsertOrUpdateDTO} from "@/api/admin/SysUserController";

export const InitForm: SysUserInsertOrUpdateDTO = {} as SysUserInsertOrUpdateDTO

const SchemaFormColumnList = (): ProFormColumnsType<SysUserInsertOrUpdateDTO>[] => {
    return [

        {
            title: '登录名',
            dataIndex: 'signInName',
            formItemProps: {
                rules: [
                    {
                        min: 0,
                        max: 20,
                        pattern: /^[\u4E00-\u9FA5A-Za-z0-9_-]{2,20}$/,
                    },
                ],
            },
        },

        {
            title: '邮箱',
            dataIndex: 'email',
            formItemProps: {
                rules: [
                    {
                        min: 0,
                        max: 200,
                        pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    },
                ],
            },
        },

        {
            title: '前端加密之后的密码',
            dataIndex: 'password',
        },

        {
            title: '前端加密之后的原始密码',
            dataIndex: 'origPassword',
        },

        {
            title: '昵称',
            dataIndex: 'nickname',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        pattern: /^[\u4E00-\u9FA5A-Za-z0-9_-]{2,20}$/,
                    },
                ],
            },
        },

        {
            title: '个人简介',
            dataIndex: 'bio',
        },

        {
            title: '头像uri',
            dataIndex: 'avatarUri',
        },

        {
            title: '正常/冻结',
            dataIndex: 'enableFlag',
            valueEnum: YesNoDict,
            valueType: 'switch',
        },

        {
            title: '角色 idSet',
            dataIndex: 'roleIdSet',
        },

    ]
}

export default SchemaFormColumnList
