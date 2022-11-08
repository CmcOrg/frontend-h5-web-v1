import {YesNoDict} from "@/util/DictUtil";
import {ActionType, ProColumns} from "@ant-design/pro-components";
import {SysMenuDeleteByIdSet, SysMenuDO, SysMenuInsertOrUpdateDTO} from "@/api/admin/SysMenuController";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";

const TableColumnList = (currentForm: React.MutableRefObject<SysMenuInsertOrUpdateDTO | null>, setFormVisible: React.Dispatch<React.SetStateAction<boolean>>, actionRef: React.RefObject<ActionType>): ProColumns<SysMenuDO>[] => [

    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 50,
    },

    {title: '菜单名', dataIndex: 'name', ellipsis: true,},

    {title: '路径', dataIndex: 'path', ellipsis: true,},

    {title: '路由', dataIndex: 'router', ellipsis: true,},

    {title: '权限', dataIndex: 'auths', ellipsis: true, width: 50},

    {
        title: '权限菜单',
        dataIndex: 'authFlag',
        valueEnum: YesNoDict
    },

    {
        title: '是否显示',
        dataIndex: 'showFlag',
        valueEnum: YesNoDict
    },

    {
        title: '是否外链',
        dataIndex: 'linkFlag',
        valueEnum: YesNoDict
    },

    {title: '重定向', dataIndex: 'redirect', ellipsis: true,},

    {
        title: '起始页面',
        dataIndex: 'firstFlag',
        valueEnum: YesNoDict
    },

    {title: '排序号', dataIndex: 'orderNo', ellipsis: true, hideInSearch: true,},

    {
        title: '是否启用',
        dataIndex: 'enableFlag',
        valueEnum: YesNoDict
    },

    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (dom, entity) => [
            <a key="1" onClick={() => {
                currentForm.current = {id: entity.id} as SysMenuInsertOrUpdateDTO
                setFormVisible(true)
            }}>编辑</a>,
            <a key="2" className={"red3"} onClick={() => {
                ExecConfirm(() => {
                    return SysMenuDeleteByIdSet({idSet: [entity.id!]}).then(res => {
                        ToastSuccess(res.msg)
                        actionRef.current?.reload()
                    })
                }, undefined, `确定删除【${entity.name}】吗？`)
            }}>删除</a>,
        ],
    },
];

export default TableColumnList
