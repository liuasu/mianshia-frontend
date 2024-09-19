import LoginUserVO = API.LoginUserVO;
import { menus } from "../../config/menu";
import { checkAccess } from "@/access/checkAccess";

/**
 * 获取有权限 可访问的菜单
 * @param loginUser
 * @param menuItems
 */
export const getAccessibleMenus = (
  loginUser: LoginUserVO,
  menuItems = menus,
) => {
  return menuItems.filter((item) => {
    if (!checkAccess(loginUser, item.access)) {
      return false;
    }
    if (item.children) {
      item.children = getAccessibleMenus(loginUser, item.children);
    }
    return true;
  });
};
