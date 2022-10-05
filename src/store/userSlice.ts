import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SysMenuDO} from "@/api/admin/SysMenuController";
import {UserSelfInfoVO} from "@/api/none/UserSelfController";
import LocalStorageKey from "@/model/constant/LocalStorageKey";

interface IUserSlice {
    userSelfMenuList: SysMenuDO[] // 用户菜单
    userSelfBaseInfo: UserSelfInfoVO // 当前用户，基本信息
}

const initialState: IUserSlice = {
    userSelfMenuList: [] as SysMenuDO[],
    userSelfBaseInfo: JSON.parse(
        localStorage.getItem(LocalStorageKey.USER_SELF_INFO) || '{}'
    ),
}

function setLocalStorageUserInfo(userBaseInfo: UserSelfInfoVO) {
    localStorage.setItem(
        LocalStorageKey.USER_SELF_INFO,
        JSON.stringify(userBaseInfo)
    )
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserSelfMenuList: (state, action: PayloadAction<SysMenuDO[]>) => {
            state.userSelfMenuList = action.payload
        },
        setUserSelfInfo: (state, action: PayloadAction<UserSelfInfoVO>) => {
            state.userSelfBaseInfo = action.payload
            setLocalStorageUserInfo(action.payload)
        },
    },
})

export const {setUserSelfMenuList, setUserSelfInfo} = userSlice.actions

export default userSlice.reducer
