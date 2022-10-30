import {PropsWithChildren, useEffect} from "react";
import LocalStorageKey from "@/model/constant/LocalStorageKey";
import {Navigate} from "react-router-dom";
import {CopyrightOutlined} from "@ant-design/icons/lib";
import {useAppDispatch} from "@/store";
import {signOut} from "@/store/userSlice";

interface ISignLayout extends PropsWithChildren {
    className?: string
}

export function GetCopyright() {
    return `2021-${new Date().getFullYear()} Cmc Org. All Rights Reserved.`
}

export function GetBeiAnHref() {
    return `https://beian.miit.gov.cn`
}

export function GetBeiAnNumber() {
    return "渝ICP备2022000851号-1"
}

// 登录注册页面布局
export default function (props: ISignLayout) {

    if (localStorage.getItem(LocalStorageKey.JWT)) {
        return <Navigate to={"/"}/>
    }

    const appDispatch = useAppDispatch();
    useEffect(() => {
        appDispatch(signOut()) // store 退出登录
    }, [])

    return (
        <div className={props.className + " p-t-50 p-b-10 flex-c vwh100"}>
            <>
                {props.children}

                <div className={"w100 flex-c ai-c m-t-50"}>
                    <div className={"m-r-10"}>
                        <CopyrightOutlined/> {GetCopyright()}
                    </div>
                    <a
                        href={GetBeiAnHref()}
                        target={"_blank"}
                        title={GetBeiAnNumber()}
                    >
                        渝ICP备2022000851号-1
                    </a>
                </div>
            </>
        </div>
    )
}
