// 欢迎页
import {PageHeader} from "antd";
import CommonConstant from "@/model/constant/CommonConstant";

export default function Welcome() {

    return (
        <PageHeader
            title={CommonConstant.SYS_NAME}
        />
    )

}
