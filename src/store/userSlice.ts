import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SysMenuDO} from "@/api/admin/SysMenuController";

interface IUserSlice {
    userSelfMenuList: SysMenuDO[] // 用户菜单
}

const initialState: IUserSlice = {
    userSelfMenuList: [] as SysMenuDO[],
}


export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserSelfMenuList: (state, action: PayloadAction<SysMenuDO[]>) => {
            state.userSelfMenuList = action.payload
        }
    },
})

export const {setUserSelfMenuList} = userSlice.actions

export default userSlice.reducer
