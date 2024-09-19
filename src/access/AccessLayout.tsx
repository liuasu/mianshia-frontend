
import React from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { RootState } from "@/stores";
import { findAllMenuItemPath, findMenuItemPath } from "../../config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import { checkAccess } from "@/access/checkAccess";
import { Forbidden } from "@/app/Forbidden";

/**
 * 统一权限拦截器
 * @param children
 * @constructor
 */
export const AccessLayout: React.FC<
  Readonly<{ children: React.ReactNode }>
> = ({ children }) => {
  const pathname = usePathname();
  // 拿到当前用户
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 获取当前的菜单
  const menu = findAllMenuItemPath(pathname);
  // 获取需要的权限
  const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
  // 校验时候有权限
  const access = checkAccess(loginUser, needAccess);
  if (!access) {
    return <Forbidden />;
  }
  return children;
};
