"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { AccessLayout } from "@/access/AccessLayout";

/**
 * 全局初始化
 * @param children
 * @constructor
 */
const InitLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // 全局初始化函数，全局单次调用代码，写在这里
  const initLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 保存用户登录态
      dispatch(setLoginUser(res.data));
    } else {
      // setTimeout(() => {
      //   const testUser = {
      //     userName: "测试",
      //     id: 1,
      //     userAvatar: "assets/logo.png",
      //   };
      //   dispatch(setLoginUser(testUser));
      // }, 3000);
    }
  }, []);
  useEffect(() => {
    initLoginUser();
  }, []);
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
