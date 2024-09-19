import LoginUserVO = API.LoginUserVO;
import AccessEnum from "@/access/accessEnum";

/**
 * 检验当前用户是否有某一个权限
 * @param loginUser
 * @param needAccess
 */
export const checkAccess = (
  loginUser: LoginUserVO,
  needAccess = AccessEnum.NOT_LOGIN,
) => {
  // 获取当前用户具有的权限
  const loginUserAccess = loginUser?.userRole ?? AccessEnum.NOT_LOGIN;
  if (needAccess === AccessEnum.NOT_LOGIN) {
    return true;
  }
  if (needAccess === AccessEnum.USER) {
    return needAccess !== AccessEnum.NOT_LOGIN;
  }
  if (needAccess === AccessEnum.ADMIN) {
    return needAccess !== AccessEnum.ADMIN;
  }
};
