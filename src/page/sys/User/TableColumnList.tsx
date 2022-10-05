import {YesNoDict} from "@/util/DictUtil";
import {ActionType, ProColumns} from "@ant-design/pro-components";
import {SysUserDeleteByIdSet, SysUserInsertOrUpdateDTO, SysUserPageVO} from "@/api/admin/SysUserController";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";

const TableColumnList = (currentForm: React.MutableRefObject<SysUserInsertOrUpdateDTO | null>, setFormVisible: React.Dispatch<React.SetStateAction<boolean>>, actionRef: React.RefObject<ActionType>): ProColumns<SysUserPageVO>[] => [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
    },

    {title: '主键id', dataIndex: 'id', ellipsis: true,},

    {title: '昵称', dataIndex: 'nickname', ellipsis: true,},

    {title: '头像uri', dataIndex: 'avatarUri', ellipsis: true,},

    {title: '邮箱', dataIndex: 'email', ellipsis: true,},

    {title: '登录名', dataIndex: 'signInName', ellipsis: true,},

    {
        title: '是否正常',
        dataIndex: 'enableFlag',
        valueEnum: YesNoDict
    },

    {
        title: '是否有密码',
        dataIndex: 'passwordFlag',
        valueEnum: YesNoDict
    },

    {
        title: '创建时间',
        dataIndex: 'createTime',
        hideInSearch: true,
        valueType: 'fromNow',
    },

    {
        title: '修改时间',
        dataIndex: 'updateTime',
        hideInSearch: true,
        valueType: 'fromNow',
    },

    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (dom, entity) => [
            <a key="1" onClick={() => {
                currentForm.current = {id: entity.id} as SysUserInsertOrUpdateDTO
                setFormVisible(true)
            }}>编辑</a>,
            <a key="2" className={"red3"} onClick={() => {
                ExecConfirm(() => {
                    return SysUserDeleteByIdSet({idSet: [entity.id!]}).then(res => {
                        ToastSuccess(res.msg)
                        actionRef.current?.reload()
                    })
                }, undefined, `确定删除【${entity.nickname}】吗？`)
            }}>删除</a>,
        ],
    },
];

export default TableColumnList
