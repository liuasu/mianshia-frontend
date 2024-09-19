import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import AccessEnum from "@/access/accessEnum";

// 菜单列表
export const menus = [
    {
        path: "/",
        name: "主页",
    },
    {
        path: "/banks",
        name: "题库",
    },
    {
        path: "/questions",
        name: "题目",
    },
    {
        name: "面试鸭",
        path: "https://mianshiya.com",
        target: "_blank",
    },
    {
        path: "/admin",
        name: "管理",
        icon: <CrownOutlined />,
        access: AccessEnum.ADMIN,
        children: [
            {
                path: "/admin/user",
                name: "用户管理",
                access: AccessEnum.ADMIN,
            }
        ],
    },
] as MenuDataItem[];

// 根据路径查找所有菜单
export const findAllMenuItemPath = (path:string): MenuDataItem | null =>{
    return findMenuItemPath(menus,path);
}

// 根据路径查找菜单(递归)
export const findMenuItemPath = (menus:MenuDataItem[],path:string): MenuDataItem | null =>{
    for (const menu of menus) {
        if(menu.path === path){
            return menu;
        }
        if(menu.children){
            const menuItemPath = findMenuItemPath(menu.children,path);
            if(menuItemPath){
                return menuItemPath;
            }
        }
    }
    return null;
}