import {SignEmailSignInPassword} from "@/api/sign/SignEmailController";
import {ISignInForm} from "@/page/sign/SignIn/SignIn";
import {PasswordRSAEncrypt} from "@/util/RsaUtil";
import {SignSignInNameSignInPassword} from "@/api/sign/SignSignInNameController";
import {ToastSuccess} from "@/util/ToastUtil";
import LocalStorageKey from "@/model/constant/LocalStorageKey";
import {ApiResultVO} from "@/util/HttpUtil";
import {getAppNav} from "@/App";
import PathConstant from "@/model/constant/PathConstant";

/**
 * 处理表单
 */
export async function SignInFormHandler(form: ISignInForm) {

    const password = PasswordRSAEncrypt(form.password) // 密码加密

    if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(form.account)) { // 如果是：邮箱
        await SignEmailSignInPassword({email: form.account, password}).then(res => {
            SignInSuccess(res)
        })
    } else { // 否则是：登录名
        await SignSignInNameSignInPassword({signInName: form.account, password}).then(res => {
            SignInSuccess(res)
        });
    }

}

/**
 * 登录成功之后的处理
 */
function SignInSuccess(apiResultVO: ApiResultVO) {
    localStorage.clear()
    sessionStorage.clear()
    ToastSuccess('欢迎回来~')
    localStorage.setItem(LocalStorageKey.JWT, apiResultVO.data)
    getAppNav()(PathConstant.ADMIN_PATH)
}
