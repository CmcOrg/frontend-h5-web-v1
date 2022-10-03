import {
    DefaultFooter,
    MenuDataItem,
    PageContainer,
    ProLayout,
    RouteContext,
    RouteContextType
} from "@ant-design/pro-components";
import CommonConstant from "@/model/constant/CommonConstant";
import {Outlet} from "react-router-dom";
import {WarningFilled} from "@ant-design/icons";
import {RouterMapKeyList} from "@/router/RouterMap";
import {InDev} from "@/util/CommonUtil";
import {getAppNav} from "@/App";
import {useEffect, useState} from "react";
import {SysMenuDO, SysMenuUserSelfMenuList} from "@/api/admin/SysMenuController";
import PathConstant from "@/model/constant/PathConstant";
import SessionStorageKey from "@/model/constant/SessionStorageKey";
import {useAppDispatch} from "@/store";
import {ExecConfirm, ToastError, ToastSuccess} from "@/util/ToastUtil";
import {SignOut} from "@/util/UserUtil";
import {setUserSelfMenuList} from "@/store/userSlice";
import {ListToTree} from "@/util/TreeUtil";
import MyIcon from "@/componse/MyIcon/MyIcon";
import {Avatar, Dropdown, Menu, Space} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons/lib";
import {SignOutSelf} from "@/api/none/SignOutController";
import {GetBeiAnHref, GetBeiAnNumber, GetCopyright} from "@/layout/SignLayout/SignLayout";

// 前往：第一个页面
function goFirstPage(menuList: SysMenuDO[]) {

    if (window.location.pathname !== PathConstant.ADMIN_PATH) {
        return
    }

    const adminRedirectPath = sessionStorage.getItem(SessionStorageKey.ADMIN_REDIRECT_PATH);
    if (adminRedirectPath) {
        sessionStorage.removeItem(SessionStorageKey.ADMIN_REDIRECT_PATH)
        if (menuList.some(item => item.path === adminRedirectPath)) {
            return getAppNav()(adminRedirectPath)
        }
    }

    menuList.some((item) => {
        if (item.firstFlag && item.path) {
            getAppNav()(item.path)
        }
        return item.firstFlag
    })
}

// Admin 页面布局
export default function AdminLayout() {

    const appDispatch = useAppDispatch()
    const [element, setElement] = useState<React.ReactNode>(null);

    // 设置 element
    function doSetElement(userSelfMenuList: SysMenuDO[]) {
        if (element == null) {
            setElement(<AdminLayoutElement userSelfMenuList={userSelfMenuList}/>)
        }
    }

    useEffect(() => {
        // 加载菜单
        SysMenuUserSelfMenuList().then(res => {
            if (!res.data || !res.data.length) {
                ToastError('暂未配置菜单，请联系管理员', 5)
                SignOut()
                return
            }
            appDispatch(setUserSelfMenuList(res.data))
            doSetElement(res.data)
            goFirstPage(res.data)
        })
    }, [])

    return element

}

interface IAdminLayoutElement {
    userSelfMenuList: SysMenuDO[]
}

// Admin 页面布局元素
function AdminLayoutElement(props: IAdminLayoutElement) {
    const [pathname, setPathname] = useState<string>('')
    useEffect(() => {
        setPathname(window.location.pathname)
    }, [])
    return (
        <ProLayout
            title={CommonConstant.SYS_NAME}
            location={{
                pathname
            }}
            menu={{
                request: async () => {
                    const userSelfMenuListTemp: MenuDataItem[] = JSON.parse(JSON.stringify(props.userSelfMenuList));
                    userSelfMenuListTemp.forEach(item => {
                        item.icon = <MyIcon icon={item.icon as string}/>
                        item.hideInMenu = !item.showFlag
                    })
                    return ListToTree(userSelfMenuListTemp, true, 0);
                },
            }}
            fixSiderbar={true}
            fixedHeader={true}
            menuItemRender={(item: MenuDataItem, defaultDom: React.ReactNode) => (
                <a
                    onClick={() => {
                        if (item.path && item.router) {
                            if (RouterMapKeyList.includes(item.router)) {
                                if (item.linkFlag) {
                                    window.open(item.path, '_blank')
                                } else {
                                    setPathname(item.path)
                                    getAppNav()(item.path)
                                }
                            } else {
                                InDev()
                            }
                        }
                    }}
                >
                    <>
                        {defaultDom}
                        {(item.router && !RouterMapKeyList.includes(item.router)) &&
                        <WarningFilled className={"warning2 m-l-4"}/>
                        }
                    </>
                </a>
            )}
            rightContentRender={() => (
                <RouteContext.Consumer>
                    {(routeContextType: RouteContextType) => {
                        return <Space size={"large"}>
                            <Dropdown overlay={<Menu items={[
                                {
                                    key: '1',
                                    label: <a onClick={InDev}>
                                        个人中心
                                    </a>,
                                    icon: <UserOutlined/>
                                },
                                {
                                    key: '2',
                                    danger: true,
                                    label: <a
                                        onClick={() => {
                                            ExecConfirm(() => {
                                                return SignOutSelf().then((res) => {
                                                    ToastSuccess(res.msg)
                                                    SignOut()
                                                })
                                            }, undefined, "确定退出登录吗？")
                                        }}
                                    >
                                        退出登录
                                    </a>,
                                    icon: <LogoutOutlined/>
                                },
                            ]}/>}>
                                <div className={"h100 hand"} title={"个人中心"}>
                                    <Avatar size="small"
                                            src={CommonConstant.RANDOM_AVATAR_URL}/>
                                </div>
                            </Dropdown>
                        </Space>
                    }}
                </RouteContext.Consumer>
            )}
            footerRender={() => (
                <DefaultFooter
                    links={[
                        {key: GetBeiAnNumber(), title: GetBeiAnNumber(), href: GetBeiAnHref(), blankTarget: true},
                    ]}
                    copyright={GetCopyright()}
                />
            )}
        >
            <PageContainer waterMarkProps={{content: CommonConstant.SYS_NAME}}>
                <Outlet/>
            </PageContainer>
        </ProLayout>
    )
}
