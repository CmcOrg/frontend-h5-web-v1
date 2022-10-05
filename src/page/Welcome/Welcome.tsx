import {PageHeader} from "antd";
import CommonConstant from "@/model/constant/CommonConstant";

// 欢迎页
export default function () {

    return (
        <PageHeader
            title={CommonConstant.SYS_NAME}
        />
    )

}
