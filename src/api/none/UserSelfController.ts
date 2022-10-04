import $http from "@/util/HttpUtil";
import {AxiosRequestConfig} from "axios";

// 获取：当前用户，基本信息
export function UserSelfInfo(config?: AxiosRequestConfig) {
    return $http.myPost<void>('/userSelf/info', undefined, config)
}

// 当前用户：刷新jwt私钥后缀
export function UserSelfRefreshJwtSecretSuf(config?: AxiosRequestConfig) {
    return $http.myPost<string>('/userSelf/refreshJwtSecretSuf', undefined, config)
}

export interface UserSelfUpdateInfoDTO {
    avatarUri?: string // 头像uri
    nickname: string // 昵称 {"regexp":"^[\\u4E00-\\u9FA5A-Za-z0-9_-]{2,20}$"}
    bio?: string // 个人简介
}

// 当前用户：基本信息：修改
export function UserSelfUpdateInfo(form: UserSelfUpdateInfoDTO, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/userSelf/updateInfo', form, config)
}
