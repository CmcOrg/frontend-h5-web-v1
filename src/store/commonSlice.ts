import {createSlice} from '@reduxjs/toolkit'

interface ICommonSlice {
    rsaPublicKey: string // 非对称：公钥
}

const initialState: ICommonSlice = {
    rsaPublicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDadmaCaffN63JC5QsMK/+le5voCB4DzOsV9xOBZgGJyqnizh9/UcFkIoRae5rebdWUtnPO4CTgdJbuSvu/TtIIPj9De5/wiJilFAWd1Ve7qGaxxTxqWwFNp7p/FLr0YpMeBjOylds9GyA1cnjIqruNdYv+qRZnseE0Sq2WEZus9QIDAQAB',
}

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {},
})

export const {} = commonSlice.actions

export default commonSlice.reducer
